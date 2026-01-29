import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultsContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: var(--yellow);
  text-shadow: 6px 6px 0px #000;
  -webkit-text-stroke: 3px #000;
  margin-bottom: 40px;
  text-transform: uppercase;
  transform: rotate(-3deg);
`;

const ScoreCard = styled(motion.div)`
  background: #fff;
  border-radius: 40px;
  padding: 30px;
  margin: 20px;
  display: inline-block;
  width: 250px;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px 0px #000;
  position: relative;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background: var(--bg-color);
  border: 3px solid #000;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 900;
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.1);
`;

const Score = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: var(--blue);
  text-shadow: 3px 3px 0px #000;
  -webkit-text-stroke: 1px #000;
`;

const WinnerBadge = styled(motion.div)`
  position: absolute;
  top: -20px;
  right: -20px;
  background: var(--yellow);
  color: #000;
  border: 3px solid #000;
  padding: 10px 20px;
  font-weight: 900;
  transform: rotate(10deg);
  box-shadow: 4px 4px 0px 0px #000;
  z-index: 20;
`;

const Results = ({ players }) => {
  const navigate = useNavigate();
  
  if (!players || !Array.isArray(players) || players.length === 0) {
    return (
        <ResultsContainer>
            <Title>Loading Results...</Title>
        </ResultsContainer>
    );
  }

  const maxScore = Math.max(...players.map(p => p.score || 0));
  
  const isDraw = players.every(p => (p.score || 0) === maxScore);

  return (
    <ResultsContainer>
      <Title>
        {isDraw ? "It's a Tie!" : "Game Over!"}
      </Title>
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {players.map((p, i) => (
          <ScoreCard 
            key={p.id || i} 
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: i % 2 === 0 ? -2 : 2 }}
            transition={{ type: "spring", delay: i * 0.2 }}
          >
            {(p.score || 0) === maxScore && !isDraw && (
                <WinnerBadge
                    animate={{ rotate: [10, -10, 10], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    WINNER! 👑
                </WinnerBadge>
            )}
            <Avatar style={{ background: i === 0 ? 'var(--purple)' : 'var(--blue)', color: '#fff' }}>
                {p.username ? p.username.charAt(0).toUpperCase() : '?'}
            </Avatar>
            <h3 style={{ fontSize: '2rem', margin: '10px 0' }}>{p.username || 'Unknown'}</h3>
            <Score>{p.score || 0}/10</Score>
          </ScoreCard>
        ))}
      </div>

      <button 
        className="btn-primary" 
        style={{ marginTop: '60px', background: 'var(--red)', fontSize: '1.5rem', transform: 'rotate(-2deg)' }} 
        onClick={() => navigate('/')}
      >
        PLAY AGAIN
      </button>
    </ResultsContainer>
  );
};

export default Results;