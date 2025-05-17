import React from 'react';
import styled from 'styled-components';

const GameOverContainer = styled.div`
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
  color: ${props => props.color || '#ff5555'};
  text-shadow: 0 0 10px ${props => props.color || '#ff5555'};
`;

const LevelText = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #aaaaaa;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.6;
`;

const RestartButton = styled.button`
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

const GameOver = ({ ending, level, onRestart }) => {
  let title = '';
  let message = '';
  let color = '';
  
  switch (ending) {
    case 'fall':
      title = 'TU ES TOMBÉ !';
      message = 'Tu as fait exploser le pont, mais tu n\'as pas réussi à t\'échapper à temps. Parfois, il faut savoir regarder avant de sauter.';
      color = '#ff5555'; // Rouge
      break;
    case 'escape':
      title = 'TU T\'ES ÉCHAPPÉ !';
      message = 'Tu as parfaitement chronométré l\'explosion ! Ton passé est tombé dans l\'abîme, te permettant de continuer ton chemin vers l\'avenir.';
      color = '#55ff55'; // Vert
      break;
    case 'flip':
      title = 'SALTO STYLÉ !';
      message = 'Non seulement tu as échappé à ton passé, mais tu as fait un salto impressionnant en atteignant l\'autre côté ! Une sortie mémorable !';
      color = '#ffff55'; // Jaune doré
      break;
    case 'caught':
      title = 'RATTRAPÉ !';
      message = 'Ton passé t\'a rattrapé avant que tu ne puisses faire exploser le pont. Certaines choses sont difficiles à laisser derrière soi...';
      color = '#5555ff'; // Bleu
      break;
    default:
      title = 'PARTIE TERMINÉE';
      message = 'Ton aventure s\'est terminée de façon inattendue.';
      color = '#ffffff'; // Blanc
  }
  
  return (
    <GameOverContainer>
      <Title color={color}>{title}</Title>
      <LevelText>Niveau {level} atteint</LevelText>
      <Message>{message}</Message>
      <RestartButton onClick={onRestart}>RECOMMENCER</RestartButton>
    </GameOverContainer>
  );
};

export default GameOver;
