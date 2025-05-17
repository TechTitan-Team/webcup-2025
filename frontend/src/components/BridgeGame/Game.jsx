import React, { useRef, useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';
import { renderCharacter, renderBridge, renderEnemy, renderExplosion, renderBackground } from './sprites';

const GameCanvas = styled.canvas`
  border: 4px solid #333;
  box-shadow: 0 0 20px rgba(255, 85, 85, 0.5);
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  width: 800px;
  height: 500px;
`;

const GameContainer = styled.div`
  position: relative;
`;

const ExplodeButton = styled.button`
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #ff5555;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive, monospace;
`;

const LevelInfo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.8rem;
`;

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
const BRIDGE_WIDTH = 700;
const BRIDGE_SEGMENTS = 20;
const SEGMENT_WIDTH = BRIDGE_WIDTH / BRIDGE_SEGMENTS;
const GROUND_LEVEL = CANVAS_HEIGHT - 100;

// Actions pour le reducer
const RESET_LEVEL = 'RESET_LEVEL';
const UPDATE_GAME = 'UPDATE_GAME';
const TRIGGER_EXPLOSION = 'TRIGGER_EXPLOSION';
const DESTROY_SEGMENT = 'DESTROY_SEGMENT';
const SET_EXPLODING = 'SET_EXPLODING';
const UPDATE_KEYS = 'UPDATE_KEYS';

// Reducer pour gérer l'état du jeu
const gameReducer = (state, action) => {
  switch (action.type) {
    case RESET_LEVEL:
      return {
        ...state,
        characterPos: {
          x: 100,
          y: GROUND_LEVEL - 50,
          direction: 1,
          frame: 0,
          isJumping: false,
          verticalSpeed: 0
        },
        enemyPos: {
          x: -100 - action.level * 50,
          y: GROUND_LEVEL - 50,
          frame: 0
        },
        bridgeState: {
          segments: Array(BRIDGE_SEGMENTS).fill(1),
          explosionPos: null,
          explosionFrame: 0
        },
        gameTime: 0,
        isExploding: false,
        gameSpeed: 1
      };
    case UPDATE_GAME:
      return {
        ...state,
        characterPos: action.characterPos,
        enemyPos: action.enemyPos,
        bridgeState: action.bridgeState,
        gameTime: action.gameTime,
        gameSpeed: action.gameSpeed
      };
    case TRIGGER_EXPLOSION:
      return {
        ...state,
        isExploding: true,
        bridgeState: {
          ...state.bridgeState,
          explosionPos: action.explosionPos,
          explosionFrame: 0
        }
      };
    case DESTROY_SEGMENT:
      const newSegments = [...state.bridgeState.segments];
      newSegments[action.segment] = 0;
      return {
        ...state,
        bridgeState: {
          ...state.bridgeState,
          segments: newSegments
        }
      };
    case SET_EXPLODING:
      return {
        ...state,
        isExploding: action.value
      };
    case UPDATE_KEYS:
      return {
        ...state,
        keys: {
          ...state.keys,
          ...action.keys
        }
      };
    default:
      return state;
  }
};

const Game = ({ onGameOver, level = 1 }) => {
  const canvasRef = useRef(null);
  const isInitialized = useRef(false);
  const gameLoopRef = useRef(null);
  
  // État initial du jeu
  const initialState = {
    characterPos: {
      x: 100,
      y: GROUND_LEVEL - 50,
      direction: 1,
      frame: 0,
      isJumping: false,
      verticalSpeed: 0
    },
    enemyPos: {
      x: -100,
      y: GROUND_LEVEL - 50,
      frame: 0
    },
    bridgeState: {
      segments: Array(BRIDGE_SEGMENTS).fill(1),
      explosionPos: null,
      explosionFrame: 0
    },
    gameTime: 0,
    isExploding: false,
    gameSpeed: 1,
    keys: {
      left: false,
      right: false,
      space: false
    }
  };
  
  // Utiliser useReducer pour gérer l'état du jeu
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  
  // Références pour stocker les valeurs sans déclencher de re-rendu
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;
  
  // Calculer la vitesse de l'ennemi en fonction du niveau
  const enemyBaseSpeed = 3; // Vitesse de base
  const enemySpeedMultiplier = 1 + (level - 1) * 0.2; // Augmente de 20% par niveau
  
  // Gestion des événements clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          dispatch({ type: UPDATE_KEYS, keys: { left: true } });
          break;
        case 'ArrowRight':
          dispatch({ type: UPDATE_KEYS, keys: { right: true } });
          break;
        case ' ':
          dispatch({ type: UPDATE_KEYS, keys: { space: true } });
          if (!gameStateRef.current.characterPos.isJumping && !gameStateRef.current.isExploding) {
            triggerExplosion();
          }
          break;
        default:
          break;
      }
    };
    
    const handleKeyUp = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          dispatch({ type: UPDATE_KEYS, keys: { left: false } });
          break;
        case 'ArrowRight':
          dispatch({ type: UPDATE_KEYS, keys: { right: false } });
          break;
        case ' ':
          dispatch({ type: UPDATE_KEYS, keys: { space: false } });
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  // Fonction pour déclencher l'explosion
  const triggerExplosion = () => {
    const { characterPos, isExploding, bridgeState } = gameStateRef.current;
    
    if (isExploding) return;
    
    // Trouver le segment sous le personnage
    const characterSegment = Math.floor((characterPos.x - 100) / SEGMENT_WIDTH);
    
    if (characterSegment >= 0 && characterSegment < BRIDGE_SEGMENTS) {
      dispatch({
        type: TRIGGER_EXPLOSION,
        explosionPos: {
          x: 100 + characterSegment * SEGMENT_WIDTH + SEGMENT_WIDTH / 2,
          y: GROUND_LEVEL - 10
        }
      });
      
      // Commencer à détruire les segments après un délai
      setTimeout(() => {
        if (isInitialized.current) {
          destroySegments(characterSegment);
        }
      }, 500);
    }
  };
  
  // Fonction pour détruire les segments du pont
  const destroySegments = (startSegment) => {
    dispatch({ type: DESTROY_SEGMENT, segment: startSegment });
    
    // Détruire récursivement les segments adjacents avec des délais
    const destroyNext = (index, direction, delay) => {
      if (index < 0 || index >= BRIDGE_SEGMENTS || gameStateRef.current.bridgeState.segments[index] === 0) return;
      
      setTimeout(() => {
        if (isInitialized.current) {
          dispatch({ type: DESTROY_SEGMENT, segment: index });
          destroyNext(index + direction, direction, delay);
        }
      }, delay);
    };
    
    destroyNext(startSegment - 1, -1, 100);
    destroyNext(startSegment + 1, 1, 100);
  };
  
  // Effet principal pour initialiser et exécuter la boucle de jeu
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Réinitialiser le jeu pour le niveau actuel
    if (!isInitialized.current) {
      dispatch({ type: RESET_LEVEL, level });
      isInitialized.current = true;
    }
    
    // Fonction principale de la boucle de jeu
    const gameLoop = () => {
      const { 
        characterPos, enemyPos, bridgeState, 
        gameTime, isExploding, gameSpeed, keys 
      } = gameStateRef.current;
      
      // Effacer le canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Mettre à jour le temps de jeu
      const newGameTime = gameTime + 1;
      
      // Dessiner l'arrière-plan
      renderBackground(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, level);
      
      // Créer les nouvelles positions du personnage
      const newCharacterPos = {
        ...characterPos,
        frame: (characterPos.frame + 1) % 8
      };
      
      // Gérer le mouvement horizontal
      if (keys.left) {
        newCharacterPos.x -= 4 * gameSpeed;
        newCharacterPos.direction = -1;
      }
      if (keys.right) {
        newCharacterPos.x += 4 * gameSpeed;
        newCharacterPos.direction = 1;
      }
      
      // Gérer le saut
      if (keys.space && !characterPos.isJumping) {
        newCharacterPos.isJumping = true;
        newCharacterPos.verticalSpeed = -10;
      }
      
      // Appliquer la gravité si en saut/chute
      if (newCharacterPos.isJumping) {
        newCharacterPos.y += newCharacterPos.verticalSpeed;
        newCharacterPos.verticalSpeed += 0.5;
        
        // Vérifier si atterri sur un segment intact du pont
        const characterSegment = Math.floor((newCharacterPos.x - 100) / SEGMENT_WIDTH);
        if (newCharacterPos.verticalSpeed > 0 && 
            newCharacterPos.y >= GROUND_LEVEL - 50 && 
            characterSegment >= 0 && 
            characterSegment < BRIDGE_SEGMENTS && 
            bridgeState.segments[characterSegment] === 1) {
          newCharacterPos.y = GROUND_LEVEL - 50;
          newCharacterPos.isJumping = false;
          newCharacterPos.verticalSpeed = 0;
        }
      }
      
      // Garder le personnage dans les limites
      newCharacterPos.x = Math.max(50, Math.min(CANVAS_WIDTH - 50, newCharacterPos.x));
      
      // Mettre à jour la position de l'ennemi (poursuit toujours le joueur)
      const newEnemyPos = {
        ...enemyPos,
        frame: (enemyPos.frame + 1) % 8
      };
      
      // L'ennemi se déplace vers le personnage avec une vitesse basée sur le niveau
      const distanceToCharacter = characterPos.x - enemyPos.x;
      const enemySpeed = enemyBaseSpeed * enemySpeedMultiplier;
      const moveSpeed = Math.min(Math.max(distanceToCharacter, -enemySpeed), enemySpeed) * gameSpeed;
      newEnemyPos.x += moveSpeed;
      
      // Vérifier si l'ennemi est sur un segment détruit
      const enemySegment = Math.floor((newEnemyPos.x - 100) / SEGMENT_WIDTH);
      if (enemySegment >= 0 && 
          enemySegment < BRIDGE_SEGMENTS && 
          bridgeState.segments[enemySegment] === 0) {
        newEnemyPos.y += 5; // Commencer à tomber
      }
      
      // Mettre à jour l'animation de l'explosion
      const newBridgeState = { ...bridgeState };
      if (isExploding) {
        newBridgeState.explosionFrame = bridgeState.explosionFrame + 1;
        
        // Terminer l'explosion après 20 images
        if (newBridgeState.explosionFrame > 20) {
          dispatch({ type: SET_EXPLODING, value: false });
        }
      }
      
      // Vérifier si le personnage tombe
      const characterSegment = Math.floor((newCharacterPos.x - 100) / SEGMENT_WIDTH);
      if (characterSegment >= 0 && characterSegment < BRIDGE_SEGMENTS) {
        if (bridgeState.segments[characterSegment] === 0 && !newCharacterPos.isJumping) {
          // Le personnage est au-dessus d'un segment détruit et ne saute pas - commencer à tomber
          newCharacterPos.isJumping = true;
          newCharacterPos.verticalSpeed = 2;
        }
      }
      
      // Déterminer si le jeu est terminé
      // Si le personnage est tombé trop loin
      if (newCharacterPos.y > CANVAS_HEIGHT + 50) {
        cancelAnimationFrame(gameLoopRef.current);
        onGameOver('fall');
        return;
      }
      
      // Si l'ennemi est tombé
      if (newEnemyPos.y > CANVAS_HEIGHT + 50) {
        cancelAnimationFrame(gameLoopRef.current);
        onGameOver('escape');
        return;
      }
      
      // Si le personnage a atteint la fin avec un écart entre lui et l'ennemi
      if (newCharacterPos.x > 100 + BRIDGE_WIDTH && newEnemyPos.x < 100 + BRIDGE_WIDTH - 100) {
        cancelAnimationFrame(gameLoopRef.current);
        onGameOver('flip');
        return;
      }
      
      // Si l'ennemi a rattrapé le personnage
      if (Math.abs(newCharacterPos.x - newEnemyPos.x) < 30 && Math.abs(newCharacterPos.y - newEnemyPos.y) < 30) {
        cancelAnimationFrame(gameLoopRef.current);
        onGameOver('caught');
        return;
      }
      
      // Augmenter progressivement la vitesse du jeu
      let newGameSpeed = gameSpeed;
      if (newGameTime % 300 === 0) {
        newGameSpeed = Math.min(gameSpeed + 0.1, 2);
      }
      
      // Dessiner le pont
      renderBridge(ctx, 100, GROUND_LEVEL, BRIDGE_WIDTH, bridgeState.segments, level);
      
      // Dessiner l'explosion si active
      if (isExploding && bridgeState.explosionPos) {
        renderExplosion(
          ctx, 
          bridgeState.explosionPos.x, 
          bridgeState.explosionPos.y, 
          newBridgeState.explosionFrame
        );
      }
      
      // Dessiner le personnage
      renderCharacter(
        ctx, 
        newCharacterPos.x, 
        newCharacterPos.y, 
        newCharacterPos.direction, 
        newCharacterPos.frame, 
        newCharacterPos.isJumping
      );
      
      // Dessiner l'ennemi
      renderEnemy(
        ctx, 
        newEnemyPos.x, 
        newEnemyPos.y, 
        newEnemyPos.frame,
        level
      );
      
      // Mettre à jour l'état du jeu
      dispatch({
        type: UPDATE_GAME,
        characterPos: newCharacterPos,
        enemyPos: newEnemyPos,
        bridgeState: newBridgeState,
        gameTime: newGameTime,
        gameSpeed: newGameSpeed
      });
      
      // Continuer la boucle
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    // Démarrer la boucle de jeu
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    // Nettoyer
    return () => {
      cancelAnimationFrame(gameLoopRef.current);
      isInitialized.current = false;
    };
  }, [level, onGameOver, enemyBaseSpeed, enemySpeedMultiplier]);
  
  return (
    <GameContainer>
      <GameCanvas 
        ref={canvasRef} 
        width={CANVAS_WIDTH} 
        height={CANVAS_HEIGHT} 
      />
      <LevelInfo>
        Niveau {level} - Vitesse de l'ennemi: x{enemySpeedMultiplier.toFixed(1)}
      </LevelInfo>
      <ExplodeButton onClick={triggerExplosion}>
        💣 EXPLOSER LE PONT
      </ExplodeButton>
    </GameContainer>
  );
};

export default Game;
