import React, { useState } from 'react';
import styled from 'styled-components';
import Game from './Game';
import GameOver from './GameOver';
import LevelComplete from './LevelComplete';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #111;
  color: #fff;
  font-family: 'Press Start 2P', cursive, monospace;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px #ff5555, 0 0 20px #ff5555;
  color: #ff8888;
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #ff5555;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive, monospace;
  margin-top: 2rem;
  transition: all 0.3s;
  
  &:hover {
    background-color: #ff8888;
    transform: scale(1.05);
  }
`;

const Description = styled.div`
  max-width: 600px;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const LevelIndicator = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1rem;
  color: #ff8888;
`;

function BridgeGame() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'levelComplete', 'gameOver'
  const [ending, setEnding] = useState(null); // null, 'fall', 'escape', 'flip', 'caught'
  const [level, setLevel] = useState(1);

  const startGame = () => {
    setGameState('playing');
    setEnding(null);
    setLevel(1);
  };

  const endGame = (endingType) => {
    setGameState('gameOver');
    setEnding(endingType);
  };

  const completeLevel = (endingType) => {
    if (endingType === 'escape' || endingType === 'flip') {
      setGameState('levelComplete');
      setEnding(endingType);
    } else {
      endGame(endingType);
    }
  };

  const nextLevel = () => {
    setLevel(level + 1);
    setGameState('playing');
    setEnding(null);
  };

  const resetGame = () => {
    setGameState('start');
    setEnding(null);
    setLevel(1);
  };

  return (
    <AppContainer>
      {gameState === 'start' && (
        <>
          <Title>💣 Burn the Bridge</Title>
          <Description>
            <p>Tu contrôles un personnage qui court sur un pont... que tu dois faire exploser au bon moment pour empêcher ton passé de te rattraper.</p>
            <p>Utilise les flèches ← → pour te déplacer et ESPACE pour faire exploser le pont.</p>
            <p>Ton timing déterminera ton destin !</p>
          </Description>
          <StartButton onClick={startGame}>COMMENCER</StartButton>
        </>
      )}
      
      {gameState === 'playing' && (
        <>
          <LevelIndicator>NIVEAU {level}</LevelIndicator>
          <Game 
            onGameOver={completeLevel} 
            level={level}
          />
        </>
      )}
      
      {gameState === 'levelComplete' && (
        <LevelComplete 
          ending={ending} 
          level={level} 
          onNextLevel={nextLevel} 
        />
      )}
      
      {gameState === 'gameOver' && (
        <GameOver 
          ending={ending} 
          level={level}
          onRestart={resetGame} 
        />
      )}
    </AppContainer>
  );
}

export default BridgeGame;
