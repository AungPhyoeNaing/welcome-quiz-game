import React, { useState } from 'react';
import styled from 'styled-components';
import socket from '../socket';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollArea = styled.div`
  max-height: 500px;
  overflow-y: auto;
  margin: 20px 0;
  padding: 10px;
  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #fff; 
    border: 3px solid #000;
  }
  &::-webkit-scrollbar-thumb {
    background: #000; 
    border-radius: 6px;
  }
`;

const QuestionItem = styled(motion.div)`
  background: ${props => props.selected ? 'var(--yellow)' : '#fff'};
  border: 3px solid #000;
  padding: 15px 25px;
  margin-bottom: 15px;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 4px 4px 0px 0px #000;
  text-align: left;
  font-weight: 600;
  position: relative;
  
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px 0px #000;
  }
`;

const CheckMark = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: var(--green);
  color: #fff;
  border: 3px solid #000;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const OptionsContainer = styled(motion.div)`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
`;

const OptionBtn = styled.button`
  background: ${props => props.active ? 'var(--red)' : '#fff'};
  color: ${props => props.active ? '#fff' : '#000'};
  border: 3px solid #000;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 2px 2px 0px 0px #000;
  
  &:hover {
      background: ${props => props.active ? 'var(--red)' : '#eee'};
      transform: translate(-1px, -1px);
      box-shadow: 3px 3px 0px 0px #000;
  }
`;

const QuestionSelection = ({ roomId, questions, onSubmit }) => {
  const [selections, setSelections] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  const handleSelectAnswer = (question, option) => {
    const newSelections = { ...selections };
    
    // If selecting a new question and limit reached
    if (Object.keys(newSelections).length >= 10 && !newSelections[question.id]) {
      alert("You can only select 10 questions!");
      return;
    }

    newSelections[question.id] = { ...question, answer: option };
    setSelections(newSelections);
  };

  const handleDeselect = (e, questionId) => {
    e.stopPropagation();
    const newSelections = { ...selections };
    delete newSelections[questionId];
    setSelections(newSelections);
  };

  const handleSubmit = () => {
    if (Object.keys(selections).length !== 10) {
      alert(`Please select exactly 10 questions. You have ${Object.keys(selections).length}.`);
      return;
    }
    socket.emit('submit_selection', { 
        roomId, 
        selectedQuestions: Object.values(selections) 
    });
    onSubmit();
  };

  return (
    <div>
      <h2 style={{ textTransform: 'uppercase', fontSize: '2rem', transform: 'rotate(-1deg)' }}>
        Pick 10 Questions
      </h2>
      <p style={{ fontWeight: 'bold' }}>Answer truthfully!</p>
      
      <div style={{ textAlign: 'right', fontWeight: '800', fontSize: '1.2rem', color: 'var(--blue)', marginBottom: '10px' }}>
        SELECTED: {Object.keys(selections).length} / 10
      </div>

      <ScrollArea>
        {questions.map((q, i) => {
          const isSelected = !!selections[q.id];
          const currentAnswer = selections[q.id]?.answer;
          // Random rotation for list items
          const rotate = (i % 3 === 0) ? -1 : (i % 3 === 1) ? 1 : 0;

          return (
            <QuestionItem 
              key={q.id} 
              selected={isSelected} 
              onClick={() => setExpandedId(q.id === expandedId ? null : q.id)}
              style={{ transform: `rotate(${rotate}deg)` }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{q.text}</span>
                {isSelected && (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button 
                            onClick={(e) => handleDeselect(e, q.id)}
                            style={{ 
                                background: 'var(--red)', 
                                color: '#fff', 
                                border: '2px solid #000', 
                                borderRadius: '50%', 
                                width: '30px', 
                                height: '30px',
                                padding: 0,
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                boxShadow: '2px 2px 0px #000'
                            }}
                            title="Remove Selection"
                        >
                            ✕
                        </button>
                        <CheckMark>✓</CheckMark>
                    </div>
                )}
              </div>
              
              <AnimatePresence>
              {(expandedId === q.id || isSelected) && (
                <OptionsContainer 
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {q.options.map(opt => (
                    <OptionBtn 
                      key={opt} 
                      active={currentAnswer === opt}
                      onClick={() => handleSelectAnswer(q, opt)}
                    >
                      {opt}
                    </OptionBtn>
                  ))}
                </OptionsContainer>
              )}
              </AnimatePresence>
            </QuestionItem>
          );
        })}
      </ScrollArea>

      <button 
        className="btn-primary" 
        disabled={Object.keys(selections).length !== 10}
        style={{ 
            background: Object.keys(selections).length === 10 ? 'var(--green)' : '#ccc',
            width: '100%',
            fontSize: '1.5rem'
        }}
        onClick={handleSubmit}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default QuestionSelection;