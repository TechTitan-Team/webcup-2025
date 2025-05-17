import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import createMaze from './createMaze';

// Styles
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background-color: #000;
  padding-left: 100px;
  padding-right: 100px;
`;

const GameTitle = styled.h1`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InstructionsPanel = styled.div`
  flex: 1;
  text-align: left;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const GamePanel = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.width}, 30px);
  grid-template-rows: repeat(${props => props.height}, 30px);
  gap: 0;
  border: 2px solid #333;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

const Cell = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: ${props => {
    if (props.isWall) return '#333';
    if (props.isPlayer) return '#4CAF50';
    if (props.isExit) return '#E91E63';
    if (props.isToxic) return '#FF9800';
    if (props.isBonus) return '#2196F3';
    return '#fff';
  }};
  color: ${props => (props.isWall ? '#333' : '#fff')};
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const Stat = styled.div`
  background-color: ${props => props.color || '#f0f0f0'};
  padding: 10px;
  border-radius: 5px;
  color: ${props => props.textColor || '#333'};
  flex: 1;
  margin: 0 5px;
  text-align: center;
`;

const GameMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.color || '#333'};
  margin: 20px 0;
  text-align: center;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
  
  &:hover {
    background-color: #45a049;
  }
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LegendIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color || 'transparent'};
  border-radius: 4px;
`;

// Constantes du jeu
const MAZE_WIDTH = 21;
const MAZE_HEIGHT = 15;
const BASE_TOXIC_ITEMS = ['Stand-up meeting', 'DM de l\'ex', 'Slack @here'];
const ADDITIONAL_TOXIC_ITEMS = [
  'Email à 17h59', 'Réunion sans agenda', 'Deadline surprise',
  'Café froid', 'Imprimante en panne', 'Wifi instable',
  'Clavier collant', 'Batterie faible', 'Notification LinkedIn',
  'Appel commercial', 'Mise à jour forcée', 'Bug en production'
];
const BONUS_ITEMS = ['Paix intérieure', 'Nouveau projet', 'Indifférence sacrée'];

const Game = () => {
  const [maze, setMaze] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 1 });
  const [exitPosition, setExitPosition] = useState({ x: MAZE_WIDTH - 1, y: MAZE_HEIGHT - 2 });
  const [toxicItems, setToxicItems] = useState([]);
  const [bonusItems, setBonus] = useState([]);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [collectedBonuses, setCollectedBonuses] = useState([]);
  const [level, setLevel] = useState(1);
  const [currentToxicItems, setCurrentToxicItems] = useState([...BASE_TOXIC_ITEMS]);
  const [gameInitialized, setGameInitialized] = useState(false);

  // Initialiser le jeu
  const initGame = useCallback((newLevel = 1, keepScore = false) => {
    const newMaze = createMaze(MAZE_WIDTH, MAZE_HEIGHT);
    setMaze(newMaze);
    setPlayerPosition({ x: 0, y: 1 });
    setExitPosition({ x: MAZE_WIDTH - 1, y: MAZE_HEIGHT - 2 });
    
    // Déterminer les éléments toxiques pour ce niveau
    let toxicItemsForLevel = [...BASE_TOXIC_ITEMS];
    
    // Ajouter des éléments toxiques supplémentaires en fonction du niveau
    if (newLevel > 1) {
      const additionalItems = Math.min(newLevel - 1, ADDITIONAL_TOXIC_ITEMS.length);
      toxicItemsForLevel = [
        ...BASE_TOXIC_ITEMS,
        ...ADDITIONAL_TOXIC_ITEMS.slice(0, additionalItems)
      ];
    }
    
    setCurrentToxicItems(toxicItemsForLevel);
    
    // Placer aléatoirement les éléments toxiques et les bonus
    const newToxicItems = [];
    const newBonusItems = [];
    
    // Trouver des positions valides (chemins) pour les éléments
    const validPositions = [];
    for (let y = 0; y < MAZE_HEIGHT; y++) {
      for (let x = 0; x < MAZE_WIDTH; x++) {
        if (newMaze[y][x] === 1 && 
            !(x === 0 && y === 1) && 
            !(x === MAZE_WIDTH - 1 && y === MAZE_HEIGHT - 2)) {
          validPositions.push({ x, y });
        }
      }
    }
    
    // Mélanger les positions valides
    validPositions.sort(() => Math.random() - 0.5);
    
    // Placer les éléments toxiques
    for (let i = 0; i < toxicItemsForLevel.length; i++) {
      if (validPositions.length > 0) {
        const pos = validPositions.pop();
        newToxicItems.push({
          ...pos,
          type: toxicItemsForLevel[i]
        });
      }
    }
    
    // Placer les bonus
    for (let i = 0; i < BONUS_ITEMS.length; i++) {
      if (validPositions.length > 0) {
        const pos = validPositions.pop();
        newBonusItems.push({
          ...pos,
          type: BONUS_ITEMS[i]
        });
      }
    }
    
    setToxicItems(newToxicItems);
    setBonus(newBonusItems);
    setScore(keepScore ? score : 0); // Conserver le score si on passe au niveau suivant
    setHealth(100);
    setGameOver(false);
    setGameWon(false);
    setCollectedBonuses([]);
    setLevel(newLevel);
    setGameInitialized(true);
  }, [score]);

  // Initialiser le jeu au chargement
  useEffect(() => {
    if (!gameInitialized) {
      initGame();
    }
  }, [initGame, gameInitialized]);

  // Gérer les déplacements du joueur
  const handleKeyDown = useCallback((e) => {
    if (gameOver || gameWon) return;
    
    let newX = playerPosition.x;
    let newY = playerPosition.y;
    
    switch (e.key) {
      case 'ArrowUp':
        newY--;
        break;
      case 'ArrowRight':
        newX++;
        break;
      case 'ArrowDown':
        newY++;
        break;
      case 'ArrowLeft':
        newX--;
        break;
      default:
        return;
    }
    
    // Vérifier si le mouvement est valide (pas de mur)
    if (newX >= 0 && newX < MAZE_WIDTH && newY >= 0 && newY < MAZE_HEIGHT && maze[newY][newX] === 1) {
      // Vérifier si le joueur a atteint la sortie
      if (newX === exitPosition.x && newY === exitPosition.y) {
        setGameWon(true);
        setScore(prevScore => prevScore + 50); // Bonus pour avoir terminé le niveau
      }
      
      // Vérifier les collisions avec les éléments toxiques
      const toxicCollision = toxicItems.findIndex(item => item.x === newX && item.y === newY);
      if (toxicCollision !== -1) {
        const newHealth = health - 25;
        setHealth(newHealth);
        
        if (newHealth <= 0) {
          setGameOver(true);
        }
      }
      
      // Vérifier les collisions avec les bonus
      const bonusCollision = bonusItems.findIndex(item => item.x === newX && item.y === newY);
      if (bonusCollision !== -1) {
        const collectedBonus = bonusItems[bonusCollision];
        
        // Mettre à jour les bonus (enlever celui qui vient d'être collecté)
        setBonus(prevBonusItems => prevBonusItems.filter((_, index) => index !== bonusCollision));
        
        // Augmenter le score
        setScore(prevScore => prevScore + 10);
        
        // Ajouter le bonus à la liste des bonus collectés
        setCollectedBonuses(prevCollectedBonuses => [...prevCollectedBonuses, collectedBonus.type]);
      }
      
      // Déplacer le joueur
      setPlayerPosition({ x: newX, y: newY });
    }
  }, [playerPosition, maze, exitPosition, toxicItems, bonusItems, health, gameOver, gameWon]);

  // Ajouter l'écouteur d'événements pour les touches
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Passer au niveau suivant
  const nextLevel = () => {
    initGame(level + 1, true); // true pour garder le score
  };

  // Recommencer depuis le début
  const restartGame = () => {
    initGame(1, false); // false pour réinitialiser le score
  };

  // Rendu du jeu
  return (
    <GameContainer>
      <GameTitle>Trouve la sortie - Niveau {level}</GameTitle>
      
      <GameContent>
        <InstructionsPanel>
          <h2>Instructions</h2>
          <p>Utilisez les flèches du clavier pour vous déplacer dans le labyrinthe.</p>
          <p>Objectif: Atteignez la porte de sortie tout en évitant les éléments toxiques et en collectant les bonus.</p>
          
          <Legend>
            <h3>Légende</h3>
            <LegendItem>
              <LegendIcon>😀</LegendIcon>
              <span>Vous</span>
            </LegendItem>
            <LegendItem>
              <LegendIcon>🚪</LegendIcon>
              <span>Sortie</span>
            </LegendItem>
            <LegendItem>
              <LegendIcon>☠️</LegendIcon>
              <span>Élément toxique (-25% santé)</span>
            </LegendItem>
            <LegendItem>
              <LegendIcon>✨</LegendIcon>
              <span>Bonus (+10 points)</span>
            </LegendItem>
          </Legend>
          
          <h3>Éléments toxiques à éviter (Niveau {level}):</h3>
          <ul>
            {currentToxicItems.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          
          <h3>Bonus à collecter:</h3>
          <ul>
            {BONUS_ITEMS.map(item => (
              <li key={item}>{item} {collectedBonuses.includes(item) ? '✅' : ''}</li>
            ))}
          </ul>
        </InstructionsPanel>
        
        <GamePanel>
          <StatsContainer>
            <Stat color="#4CAF50" textColor="white">Score: {score}</Stat>
            <Stat color="#9C27B0" textColor="white">Niveau: {level}</Stat>
            <Stat color={health > 50 ? '#4CAF50' : health > 25 ? '#FF9800' : '#F44336'} textColor="white">
              Santé: {health}%
            </Stat>
          </StatsContainer>
          
          {(gameOver || gameWon) && (
            <GameMessage color={gameWon ? '#4CAF50' : '#F44336'}>
              {gameWon ? 'Félicitations! Vous avez trouvé la sortie!' : 'Game Over! Vous avez été submergé par la toxicité!'}
            </GameMessage>
          )}
          
          <GameBoard width={MAZE_WIDTH} height={MAZE_HEIGHT}>
            {maze.map((row, y) => 
              row.map((cell, x) => {
                const isPlayer = playerPosition.x === x && playerPosition.y === y;
                const isExit = exitPosition.x === x && exitPosition.y === y;
                const toxicItem = toxicItems.find(item => item.x === x && item.y === y);
                const bonusItem = bonusItems.find(item => item.x === x && item.y === y);
                
                return (
                  <Cell 
                    key={`${x}-${y}`} 
                    isWall={cell === 0}
                    isPlayer={isPlayer}
                    isExit={isExit}
                    isToxic={!!toxicItem}
                    isBonus={!!bonusItem}
                  >
                    {isPlayer ? '😀' : 
                     isExit ? '🚪' : 
                     toxicItem ? '☠️' : 
                     bonusItem ? '✨' : ''}
                  </Cell>
                );
              })
            )}
          </GameBoard>
          
          <div>
            {gameWon && (
              <Button onClick={nextLevel}>Niveau suivant</Button>
            )}
            <Button onClick={restartGame}>Nouvelle partie</Button>
          </div>
        </GamePanel>
      </GameContent>
    </GameContainer>
  );
};

export default Game;
