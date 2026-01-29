import React, { useState } from 'react';
import styled from 'styled-components';
import socket from '../socket';
import { motion, AnimatePresence } from 'framer-motion';

const QuizContainer = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuestionCard = styled(motion.div)`
  background: #fff;
  border-radius: 40px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px 0px #000;
  position: relative;
  z-index: 10;
`;

const QuestionText = styled.h2`
  color: #000;
  margin-bottom: 30px;
  font-size: 1.8rem;
  line-height: 1.3;
`;

const OptionButton = styled(motion.button)`
  background: #fff;
  border: 3px solid #000;
  width: 100%;
  padding: 15px 25px;
  margin-bottom: 15px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 700;
  box-shadow: 4px 4px 0px 0px #000;
  text-align: left;
  
  &:hover {
    background: var(--yellow);
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px 0px #000;
  }
  
  &:active {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0px 0px #000;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 25px;
  border: 3px solid #000;
  border-radius: 50px;
  margin-bottom: 30px;
  background: #fff;
  overflow: hidden;
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.2);
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: var(--blue);
  border-right: 3px solid #000;
`;

const Quiz = ({ roomId, data, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { opponentName, questionsToAnswer } = data;

  const handleAnswer = (option) => {
    const currentQuestion = questionsToAnswer[currentIndex];
    const newAnswers = [...answers, { questionId: currentQuestion.id, selectedOption: option }];
    
    setAnswers(newAnswers);

    if (currentIndex < questionsToAnswer.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Submit
      socket.emit('submit_answers', {
        roomId,
        answers: newAnswers
      });
      onFinish();
    }
  };

  const currentQ = questionsToAnswer[currentIndex];

  return (
    <QuizContainer>
      <h3 style={{ transform: 'rotate(-2deg)', background: 'var(--red)', color: '#fff', padding: '5px 15px', border: '3px solid #000' }}>
        GUESS {opponentName.toUpperCase()}'S ANSWER!
      </h3>
      
      <ProgressBarContainer>
        <ProgressFill 
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex) / questionsToAnswer.length) * 100}%` }}
        />
      </ProgressBarContainer>
      
      <AnimatePresence mode='wait'>
        <QuestionCard
          key={currentIndex}
          initial={{ opacity: 0, x: 100, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          exit={{ opacity: 0, x: -100, rotate: -5 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <QuestionText>{currentQ.text}</QuestionText>
          {currentQ.options.map((opt, i) => (
            <OptionButton 
                key={i} 
                onClick={() => handleAnswer(opt)}
                whileTap={{ scale: 0.95 }}
            >
              {opt}
            </OptionButton>
          ))}
        </QuestionCard>
      </AnimatePresence>

      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Question {currentIndex + 1} / {questionsToAnswer.length}
      </div>
    </QuizContainer>
  );
};

export default Quiz;