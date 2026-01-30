import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

const Shape = styled(motion.div)`
  position: absolute;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  background: ${props => props.bg || '#fff'};
`;

const Circle = styled(Shape)`
  border-radius: 50%;
`;

const Square = styled(Shape)`
  border-radius: 10px;
`;

const Donut = styled(Shape)`
  border-radius: 50%;
  background: transparent;
  border: 6px solid #000; /* Thicker border for donut look */
  box-shadow: none;
`;

const Triangle = styled(motion.svg)`
  position: absolute;
  filter: drop-shadow(4px 4px 0px #000);
  fill: ${props => props.fill || '#fff'};
  stroke: #000;
  stroke-width: 3px;
`;

const Squiggle = styled(motion.svg)`
  position: absolute;
  fill: none;
  stroke: #000;
  stroke-width: 4px;
  stroke-linecap: round;
  filter: drop-shadow(3px 3px 0px rgba(0,0,0,0.2));
`;

const BackgroundElements = () => {
  return (
    <Container>
      {/* Floating Circle Top Left */}
      <Circle
        bg="var(--red)"
        style={{ width: 60, height: 60, top: '10%', left: '5%' }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Square Bottom Right */}
      <Square
        bg="var(--blue)"
        style={{ width: 50, height: 50, bottom: '15%', right: '10%' }}
        animate={{
          y: [0, 30, 0],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Large Donut Top Right */}
      <Donut
        style={{ width: 80, height: 80, top: '20%', right: '15%', borderColor: 'var(--yellow)' }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Tiny Circle Middle Left */}
      <Circle
        bg="var(--green)"
        style={{ width: 30, height: 30, top: '50%', left: '15%' }}
        animate={{
          x: [0, 20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Triangle Bottom Left */}
      <Triangle
        width="60"
        height="60"
        viewBox="0 0 50 50"
        fill="var(--purple)"
        style={{ bottom: '10%', left: '8%' }}
        animate={{
          rotate: [0, 10, -10, 0],
          y: [0, -15, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M25 5 L45 45 L5 45 Z" />
      </Triangle>

      {/* Another Triangle Top Middle */}
      <Triangle
        width="40"
        height="40"
        viewBox="0 0 50 50"
        fill="var(--yellow)"
        style={{ top: '15%', left: '60%' }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
         <path d="M25 5 L45 45 L5 45 Z" />
      </Triangle>

       {/* Squiggle Middle Right */}
       <Squiggle
        width="100"
        height="40"
        viewBox="0 0 100 40"
        style={{ top: '60%', right: '5%' }}
        animate={{
          x: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
       >
         <path d="M5 20 Q 25 5, 45 20 T 95 20" />
       </Squiggle>

       {/* Random small shapes for texture */}
       <Square
        bg="#000"
        style={{ width: 15, height: 15, top: '30%', left: '30%', opacity: 0.1 }}
       />
       <Circle
        bg="#000"
        style={{ width: 10, height: 10, bottom: '40%', right: '40%', opacity: 0.1 }}
       />

    </Container>
  );
};

export default BackgroundElements;
