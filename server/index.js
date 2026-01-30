const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const questions = require('./questions');
const path = require('path');

const app = express();
app.use(cors());

// Serve static files from the client build directory
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// State management (in-memory)
const rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle explicit leave (e.g. "Wrong Room")
  socket.on('leave_room', ({ roomId }) => {
      const room = rooms[roomId];
      if (room) {
          const playerIndex = room.players.findIndex(p => p.id === socket.id);
          if (playerIndex !== -1) {
              room.players.splice(playerIndex, 1);
              socket.leave(roomId);
              
              io.to(roomId).emit('room_data', {
                  players: room.players,
                  gameState: room.gameState
              });
          }
      }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Find which room this socket is in
    for (const roomId in rooms) {
      const room = rooms[roomId];
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      
      if (playerIndex !== -1) {
        // If game hasn't started (waiting), remove the player
        if (room.gameState === 'waiting') {
          room.players.splice(playerIndex, 1);
          
          // Notify remaining player (if any)
          io.to(roomId).emit('room_data', {
            players: room.players,
            gameState: room.gameState
          });
        }
        // If game is in progress, we keep them in the array to allow reconnection
        // (The join_room logic handles the socket ID update)
        break;
      }
    }
  });

  // Join a room
  socket.on('join_room', ({ username, roomId }) => {
    socket.join(roomId);
    
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: [],
        gameState: 'waiting', // waiting, selecting, playing, results
        questionsPool: [],
        playerSelections: {}
      };
      
      // Select 30 random questions for this session
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      rooms[roomId].questionsPool = shuffled.slice(0, 30);
    }

    const room = rooms[roomId];

    // Check if player already exists
    const existingPlayerIndex = room.players.findIndex(p => p.username === username);
    
    // Room Full Check (if new player)
    if (existingPlayerIndex === -1 && room.players.length >= 2) {
      socket.emit('error', 'Room is full');
      return;
    }

    // Now it's safe to join
    socket.join(roomId);

    if (existingPlayerIndex !== -1) {
       // Update socket id for reconnecting player
       room.players[existingPlayerIndex].id = socket.id;
       
       // SYNC STATE FOR RECONNECTING PLAYER
       // 1. If selecting, send pool
       if (room.gameState === 'selecting') {
           socket.emit('game_start_selection', { questions: room.questionsPool });
           // If they already selected, maybe tell them? (Complex, skipping for now)
       }
       // 2. If playing, send quiz data
       if (room.gameState === 'playing') {
           const me = room.players[existingPlayerIndex];
           const opponent = room.players.find(p => p.username !== username);
           if (opponent && room.playerSelections[opponent.id]) {
               socket.emit('start_quiz', {
                   opponentName: opponent.username,
                   questionsToAnswer: room.playerSelections[opponent.id].map(q => ({
                       id: q.id,
                       text: q.text,
                       options: q.options
                   }))
               });
           }
       }
       // 3. If results, send game over
       if (room.gameState === 'results') {
           socket.emit('game_over', { players: room.players });
       }

    } else {
       room.players.push({ id: socket.id, username, score: 0 });
    }

    // Notify room of player update
    io.to(roomId).emit('room_data', {
      players: room.players,
      gameState: room.gameState
    });

    // If 2 players, start selection phase
    if (room.players.length === 2 && room.gameState === 'waiting') {
      room.gameState = 'selecting';
      io.to(roomId).emit('game_start_selection', {
        questions: room.questionsPool
      });
    }
  });

  // Handle question selection
  // User sends: { selectedQuestions: [{id, answer}] } -> Questions they picked for opponent to guess about them
  socket.on('submit_selection', ({ roomId, selectedQuestions }) => {
    const room = rooms[roomId];
    if (!room) return;

    room.playerSelections[socket.id] = selectedQuestions;

    // Check if both players have submitted
    if (Object.keys(room.playerSelections).length === 2) {
      room.gameState = 'playing';
      
      // Send cross questions: 
      // Player A needs to guess Player B's answers.
      // So Player A receives Player B's selected questions (without the answers)
      
      const player1 = room.players[0];
      const player2 = room.players[1];

      // Send to Player 1: Questions selected by Player 2
      io.to(player1.id).emit('start_quiz', {
        opponentName: player2.username,
        questionsToAnswer: room.playerSelections[player2.id].map(q => ({
          id: q.id,
          text: q.text,
          options: q.options
        }))
      });

      // Send to Player 2: Questions selected by Player 1
      io.to(player2.id).emit('start_quiz', {
        opponentName: player1.username,
        questionsToAnswer: room.playerSelections[player1.id].map(q => ({
          id: q.id,
          text: q.text,
          options: q.options
        }))
      });
    } else {
        // Notify that we are waiting for the other player
        socket.emit('waiting_for_opponent');
    }
  });

  // Handle Answer Submission
  // User sends: { answers: [{ questionId, selectedOption }] }
  socket.on('submit_answers', ({ roomId, answers }) => {
    const room = rooms[roomId];
    if (!room) return;

    const player = room.players.find(p => p.id === socket.id);
    const opponent = room.players.find(p => p.id !== socket.id);
    
    if (!player || !opponent) return;

    // Calculate Score
    // The questions this player answered were selected by the opponent.
    // So we check against opponent's 'truth'
    const opponentTruths = room.playerSelections[opponent.id];
    let score = 0;

    answers.forEach(ans => {
        const truth = opponentTruths.find(q => q.id === ans.questionId);
        if (truth && truth.answer === ans.selectedOption) {
            score++;
        }
    });

    player.score = score;
    player.finished = true;

    // Check if both finished
    const allFinished = room.players.every(p => p.finished);
    
    if (allFinished) {
        room.gameState = 'results';
        io.to(roomId).emit('game_over', {
            players: room.players
        });
        
        // Cleanup room after 5 minutes to allow viewing results
        setTimeout(() => {
            if (rooms[roomId] && rooms[roomId].gameState === 'results') {
                delete rooms[roomId];
            }
        }, 5 * 60 * 1000); 
    } else {
        socket.emit('waiting_results');
    }
  });
});

// Handle React Routing, return all requests to React app
app.get(/^(.*)$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`\n❌ ERROR: Port ${PORT} is already in use.`);
    console.error(`   - If you are on aaPanel, the "Node Project" manager likely started this automatically.`);
    console.error(`   - To fix: Stop the project in aaPanel UI, or check what is using this port: "netstat -tunlp | grep ${PORT}"\n`);
    process.exit(1);
  } else {
    throw e;
  }
});