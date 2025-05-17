import React from 'react';
import styled from 'styled-components';

const LevelCompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 10px;
  max-width: 800px;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #55ff55;
  text-shadow: 0 0 10px #55ff55;
`;

const LevelText = styled.h3`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #ffff55;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.6;
`;

const NextLevelButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #55ff55;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive, monospace;
  margin-top: 2rem;
  transition: all 0.3s;
  
  &:hover {
    background-color: #88ff88;
    transform: scale(1.05);
  }
`;

const Warning = styled.p`
  font-size: 1.2rem;
  color: #ff8855;
  margin-top: 1rem;
  text-align: center;
`;

const LevelComplete = ({ ending, level, onNextLevel }) => {
  let message = '';
  
  switch (ending) {
    case 'escape':
      message = 'Tu as parfaitement chronométré l\'explosion ! Ton passé est tombé dans l\'abîme, mais ce n\'est pas fini...';
      break;
    case 'flip':
      message = 'Non seulement tu as échappé à ton passé, mais tu as fait un salto impressionnant ! Prépare-toi pour un défi encore plus grand.';
      break;
    default:
      message = 'Tu as réussi à échapper à ton passé, mais ce n\'est pas terminé.';
  }
  
  return (
    <LevelCompleteContainer>
      <Title>NIVEAU RÉUSSI !</Title>
      <LevelText>Niveau {level} complété</LevelText>
      <Message>{message}</Message>
      
      <Warning>
        Attention ! Au niveau suivant, ton passé sera plus rapide et plus déterminé à te rattraper.
      </Warning>
      
      <NextLevelButton onClick={onNextLevel}>
        NIVEAU {level + 1}
      </NextLevelButton>
    </LevelCompleteContainer>
  );
};

export default LevelComplete;
