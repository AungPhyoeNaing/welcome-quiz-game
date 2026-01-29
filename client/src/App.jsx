import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JoinGame from './components/JoinGame';
import GameRoom from './components/GameRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinGame />} />
        <Route path="/game/:roomId" element={<GameRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;