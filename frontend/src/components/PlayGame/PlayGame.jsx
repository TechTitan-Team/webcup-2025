import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Text } from '@react-three/drei';
import { Physics, useSphere, useSpring, usePlane } from '@react-three/cannon';
import * as THREE from 'three';

// Composant pour le punching ball
function PunchingBall(props) {
  // Référence au point d'ancrage (fixe)
  const [anchorRef] = useSphere(() => ({
    mass: 0, // Masse 0 = objet statique
    position: [0, 6, 0],
    type: 'Static',
    args: [0.2], // Petit rayon pour le point d'ancrage
  }));

  // Référence au ball (avec physique)
  const [ballRef, ballApi] = useSphere(() => ({
    mass: 1,
    position: [0, 3, 0],
    args: [1], // Rayon de la sphère
    linearDamping: 0.5, // Amortissement pour que le ball revienne à sa position plus rapidement
    angularDamping: 0.5, // Amortissement de la rotation
    ...props
  }));

  // Créer un ressort entre l'ancre et le ball
  useSpring(anchorRef, ballRef, {
    restLength: 3, // Longueur au repos (distance entre l'ancre et le ball)
    stiffness: 50, // Rigidité du ressort
    damping: 5, // Amortissement du ressort
    localAnchorA: [0, 0, 0], // Point d'attache sur l'ancre
    localAnchorB: [0, 0, 0], // Point d'attache sur le ball
  });

  // État pour suivre les coups
  const [hitCount, setHitCount] = useState(0);
  // État pour l'animation de coup
  const [isPunched, setIsPunched] = useState(false);
  
  // Position actuelle du punching ball
  const position = useRef([0, 3, 0]);
  const velocity = useRef([0, 0, 0]);
  
  // Suivre la position et la vélocité pour l'utiliser dans notre logique
  useEffect(() => {
    const unsubscribePosition = ballApi.position.subscribe((p) => (position.current = p));
    const unsubscribeVelocity = ballApi.velocity.subscribe((v) => (velocity.current = v));
    
    return () => {
      unsubscribePosition();
      unsubscribeVelocity();
    };
  }, [ballApi]);

  // Force à appliquer lorsque le ball est frappé
  const punch = (event) => {
    // Empêcher la propagation pour que OrbitControls ne soit pas affecté
    event.stopPropagation();
    
    // Calculer la direction du coup basée sur la position du clic
    const clickPosition = event.point;
    const ballPosition = new THREE.Vector3(...position.current);
    
    // Direction de la force (du point de clic vers le ball)
    const direction = new THREE.Vector3()
      .subVectors(ballPosition, clickPosition)
      .normalize();
    
    // Appliquer une force plus importante
    const force = direction.multiplyScalar(20);
    
    // Appliquer l'impulsion
    ballApi.applyImpulse([force.x, force.y, force.z], [0, 0, 0]);
    
    // Incrémenter le compteur de coups
    setHitCount(hitCount + 1);
    
    // Activer l'effet visuel de coup
    setIsPunched(true);
    setTimeout(() => setIsPunched(false), 300);
  };

  // Animation pour le ball
  useFrame(() => {
    // Calcul de la vitesse pour l'effet visuel
    const speed = Math.sqrt(
      velocity.current[0] ** 2 + 
      velocity.current[1] ** 2 + 
      velocity.current[2] ** 2
    );
    
    // Appliquer une légère force de retour vers la position initiale
    if (speed < 0.5 && position.current[1] < 2.9) {
      ballApi.applyForce([0, 1, 0], [0, 0, 0]);
    }
  });

  return (
    <>
      {/* Point d'ancrage (invisible) */}
      <mesh ref={anchorRef} visible={false}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      
      {/* Câble qui relie l'ancre au ball */}
      <Line 
        start={[0, 6, 0]} 
        end={position.current} 
        color="#333333" 
      />
      
      {/* Ball */}
      <mesh 
        ref={ballRef} 
        onClick={punch}
        castShadow
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={isPunched ? "#ff0000" : "#ff3030"}
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
      
      {/* Compteur de coups */}
      <Text
        position={[0, 7, 0]}
        rotation={[0, 0, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {`Coups: ${hitCount}`}
      </Text>
    </>
  );
}

// Composant pour dessiner une ligne entre deux points
function Line({ start, end, color }) {
  const ref = useRef();
  
  useFrame(() => {
    if (ref.current) {
      // Mettre à jour les points de la ligne
      ref.current.geometry.setFromPoints([
        new THREE.Vector3(...start),
        new THREE.Vector3(...end)
      ]);
      ref.current.geometry.verticesNeedUpdate = true;
    }
  });
  
  return (
    <line ref={ref}>
      <bufferGeometry attach="geometry" />
      <lineBasicMaterial attach="material" color={color} linewidth={2} />
    </line>
  );
}

// Sol
function Floor() {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0], 
    position: [0, 0, 0],
    type: 'Static'
  }));
  
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
}

// Composant principal
export default function PunchingBallGame() {
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 5, 10], fov: 50 }}
      style={{ background: '#87CEEB' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <Physics
        gravity={[0, -9.8, 0]}
        defaultContactMaterial={{
          friction: 0.1,
          restitution: 0.7,
        }}
      >
        <PunchingBall />
        <Floor />
      </Physics>
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}
