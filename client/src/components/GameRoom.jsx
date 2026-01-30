import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket';
import styled from 'styled-components';
import QuestionSelection from './QuestionSelection';
import Quiz from './Quiz';
import Results from './Results';

const PlayerBadge = styled.div`
  background: ${props => props.isMe ? 'var(--blue)' : '#fff'};
  padding: 10px 25px;
  border-radius: 50px; /* Pill shape for variety */
  border: 3px solid #000;
  color: ${props => props.isMe ? '#fff' : '#000'};
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 4px 4px 0px 0px #000;
  transform: ${props => props.isMe ? 'rotate(-2deg)' : 'rotate(2deg)'};
  font-size: 1.2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 30px;
`;

const StatusMessage = styled.h2`
  background: var(--yellow);
  border: 3px solid #000;
  display: inline-block;
  padding: 10px 20px;
  transform: rotate(-1deg);
  box-shadow: 4px 4px 0px 0px #000;
  font-size: 1.5rem;
`;

const GameRoom = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username = location.state?.username;
  const navigate = useNavigate(); // Add navigate hook

  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState('waiting'); // waiting, selecting, playing, results
  const [questionsPool, setQuestionsPool] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [gameOverData, setGameOverData] = useState(null);

  const handleLeave = () => {
      socket.emit('leave_room', { roomId }); // Notify server explicitly
      socket.disconnect();
      navigate('/');
  };

  useEffect(() => {
    // If username is missing (e.g. refresh), redirect to home
    if (!username) {
        navigate('/');
        return;
    }

    // Ensure socket is connected if we refresh
    if (!socket.connected) socket.connect();
    
    // Re-join logic needed for refresh? 
    // If socket reconnected, we need to emit join_room again to re-establish identity on server
    // We can do this safely every time component mounts
    socket.emit('join_room', { username, roomId });
    
    socket.on('error', (msg) => {
        alert(msg);
        navigate('/');
    });

    socket.on('room_data', (data) => {
      setPlayers(data.players);
      // Sync game state if server is ahead (e.g. reconnection)
      setGameState(data.gameState);
    });

    socket.on('game_start_selection', (data) => {
      setQuestionsPool(data.questions);
      setGameState('selecting');
    });

    socket.on('waiting_for_opponent', () => {
      setGameState('waiting_others');
    });

    socket.on('start_quiz', (data) => {
      setQuizData(data);
      setGameState('playing');
    });

    socket.on('waiting_results', () => {
        setGameState('waiting_results');
    });

    socket.on('game_over', (data) => {
        setGameOverData(data);
        setPlayers(data.players); // Update header with final scores
        setGameState('results');
    });

    return () => {
      socket.off('room_data');
      socket.off('game_start_selection');
      socket.off('start_quiz');
      socket.off('game_over');
      socket.off('error');
    };
  }, [username, roomId, navigate]);

  if (!username) return <div>Please login first.</div>;

  return (
    <div style={{ width: '100%', maxWidth: '900px' }}>
      <Header>
        {players.map((p, i) => (
          <PlayerBadge key={i} isMe={p.username === username}>
            <span>{p.username}</span>
            {p.score !== undefined && gameState === 'results' && <span> : {p.score}</span>}
          </PlayerBadge>
        ))}
      </Header>

      <div className="neo-card rotate-1">
          {players.length < 2 && gameState === 'waiting' && (
            <div>
              <StatusMessage>Room ID: {roomId}</StatusMessage>
              <p style={{marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold'}}>Waiting for Friend...</p>
              
              <button 
                onClick={handleLeave}
                style={{
                    marginTop: '20px',
                    background: '#ccc',
                    color: '#333',
                    padding: '8px 16px',
                    fontSize: '1rem',
                    border: '2px solid #000',
                    borderRadius: '20px'
                }}
              >
                  Wrong Room? Leave
              </button>
            </div>
          )}

          {gameState === 'selecting' && (
            <QuestionSelection 
              roomId={roomId} 
              questions={questionsPool} 
              onSubmit={() => setGameState('waiting_others')} 
            />
          )}

          {gameState === 'waiting_others' && (
            <div>
              <StatusMessage style={{ background: 'var(--green)', color: '#fff' }}>Submitted!</StatusMessage>
              <p style={{ marginTop: '20px' }}>Waiting for opponent...</p>
            </div>
          )}

          {gameState === 'playing' && quizData && (
            <Quiz 
                roomId={roomId}
                data={quizData}
                onFinish={() => setGameState('waiting_results')}
            />
          )}
          
          {gameState === 'waiting_results' && (
              <div>
                  <StatusMessage style={{ background: 'var(--purple)', color: '#fff' }}>Done!</StatusMessage>
                  <p>Waiting for results...</p>
              </div>
          )}

          {gameState === 'results' && gameOverData && (
            <Results players={gameOverData.players} />
          )}
      </div>
    </div>
  );
};

export default GameRoom;