import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

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
  top: -30px;
  right: -30px;
  background: var(--yellow);
  color: #000;
  border: 3px solid #000;
  padding: 15px 25px;
  font-weight: 900;
  font-size: 1.2rem;
  transform: rotate(10deg);
  box-shadow: 6px 6px 0px 0px #000;
  z-index: 20;
  border-radius: 50px;
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

  useEffect(() => {
    if (!isDraw) {
      // 1. Instant Explosion
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });

      // 2. School Pride (Side Cannons)
      const end = Date.now() + 3000;
      const colors = ['#FF6B6B', '#4D96FF', '#FFD93D', '#6BCB77'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [isDraw]);

  return (
    <ResultsContainer>
      <Title>
        {isDraw ? "It's a Tie!" : "Game Over!"}
      </Title>
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {players.map((p, i) => {
          const isWinner = (p.score || 0) === maxScore && !isDraw;
          
          return (
            <ScoreCard 
              key={p.id || i} 
              initial={{ scale: 0, rotate: -10 }}
              animate={isWinner ? { 
                  scale: [1, 1.05, 1], 
                  rotate: [0, -2, 2, 0],
                  boxShadow: ["8px 8px 0px #000", "12px 12px 0px #000", "8px 8px 0px #000"]
              } : { 
                  scale: 1, 
                  rotate: i % 2 === 0 ? -2 : 2 
              }}
              transition={isWinner ? {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
              } : { type: "spring", delay: i * 0.2 }}
              style={isWinner ? { zIndex: 10, borderColor: 'var(--yellow)' } : {}}
            >
              {isWinner && (
                  <WinnerBadge
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.2, 1], opacity: 1, rotate: [10, 5, 15, 10] }}
                      transition={{ 
                          delay: 0.5,
                          rotate: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                          scale: { duration: 0.4, type: "spring" }
                      }}
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
          );
        })}
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