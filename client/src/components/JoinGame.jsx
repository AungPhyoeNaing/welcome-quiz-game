import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  color: #000;
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
  -webkit-text-stroke: 1px #fff;
  text-shadow: 4px 4px 0px #4D96FF;
  margin-bottom: 20px;
  transform: rotate(-2deg);
`;

const Input = styled.input`
  padding: 15px 25px;
  border-radius: 50px;
  border: 3px solid #000;
  width: 100%;
  font-size: 1.2rem;
  outline: none;
  font-family: 'Fredoka', sans-serif;
  box-shadow: 4px 4px 0px 0px #000;
  transition: all 0.2s;
  
  &:focus {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px 0px #000;
    border-color: var(--blue);
  }
`;

const JoinGame = () => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (username && roomId) {
      socket.connect();
      socket.emit('join_room', { username, roomId });
      navigate(`/game/${roomId}`, { state: { username } });
    }
  };

  return (
    <div className="neo-card rotate-1">
      <Container>
        <Title>How Well Do You Know Each Other?</Title>
        <Input 
          placeholder="YOUR NAME" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Input 
          placeholder="ROOM ID" 
          value={roomId} 
          onChange={(e) => setRoomId(e.target.value)} 
        />
        <button className="btn-primary rotate-n1" onClick={handleJoin} style={{ marginTop: '10px' }}>
          Start Game
        </button>
      </Container>
    </div>
  );
};

export default JoinGame;