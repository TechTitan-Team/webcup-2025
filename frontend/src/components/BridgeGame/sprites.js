// Définition des sprites en pixel art

// Palette de couleurs
const COLORS = {
    black: '#111111',
    darkGray: '#333333',
    gray: '#555555',
    lightGray: '#999999',
    white: '#ffffff',
    red: '#ff5555',
    darkRed: '#880000',
    orange: '#ff9944',
    yellow: '#ffff00',
    green: '#55ff55',
    blue: '#5555ff',
    purple: '#aa55aa',
    brown: '#885533',
    skin: '#ffccaa',
    darkSkin: '#cc9966',
    sky: '#88ccff',
    darkSky: '#5588cc',
    ground: '#554422',
    wood: '#aa7744',
    darkWood: '#663311',
    fire: '#ff7700',
  };
  
  // Fonction pour dessiner un pixel
  const drawPixel = (ctx, x, y, size, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
  };
  
  // Dessiner le personnage
  export const renderCharacter = (ctx, x, y, direction, frame, isJumping) => {
    const size = 4; // Taille d'un pixel
    const width = 8; // Largeur en pixels
    const height = 12; // Hauteur en pixels
    
    // Position de base pour dessiner le personnage
    const baseX = Math.floor(x - (width * size) / 2);
    const baseY = Math.floor(y - (height * size) / 2);
    
    // Couleurs du personnage
    const headColor = COLORS.skin;
    const bodyColor = COLORS.blue;
    const legColor = COLORS.darkGray;
    const armColor = COLORS.blue;
    
    // Dessiner la tête
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        drawPixel(ctx, baseX + (i + 2) * size, baseY + j * size, size, headColor);
      }
    }
    
    // Dessiner le corps
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        drawPixel(ctx, baseX + (i + 1) * size, baseY + (j + 4) * size, size, bodyColor);
      }
    }
    
    // Dessiner les jambes (animées)
    if (isJumping) {
      // Position des jambes en saut
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
          drawPixel(ctx, baseX + (i + 2) * size, baseY + (j + 8) * size, size, legColor);
          drawPixel(ctx, baseX + (i + 4) * size, baseY + (j + 8) * size, size, legColor);
        }
      }
    } else {
      // Animation de course
      const legOffset = Math.floor(frame / 2) % 2 === 0 ? 1 : -1;
      
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
          drawPixel(ctx, baseX + (i + 2) * size, baseY + (j + 8 + legOffset) * size, size, legColor);
          drawPixel(ctx, baseX + (i + 4) * size, baseY + (j + 8 - legOffset) * size, size, legColor);
        }
      }
    }
    
    // Dessiner les bras (animés)
    if (isJumping) {
      // Position des bras en saut
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          drawPixel(ctx, baseX + (i - 1) * size, baseY + (j + 4) * size, size, armColor);
          drawPixel(ctx, baseX + (i + 7) * size, baseY + (j + 4) * size, size, armColor);
        }
      }
    } else {
      // Animation de course
      const armOffset = Math.floor(frame / 2) % 2 === 0 ? 1 : -1;
      
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          drawPixel(ctx, baseX + (i - 1) * size, baseY + (j + 4 + armOffset) * size, size, armColor);
          drawPixel(ctx, baseX + (i + 7) * size, baseY + (j + 4 - armOffset) * size, size, armColor);
        }
      }
    }
    
    // Dessiner les yeux (regardant dans la direction du mouvement)
    if (direction > 0) {
      drawPixel(ctx, baseX + 5 * size, baseY + 2 * size, size, COLORS.black);
    } else {
      drawPixel(ctx, baseX + 3 * size, baseY + 2 * size, size, COLORS.black);
    }
  };
  
  // Dessiner l'ennemi (le "passé") avec apparence qui évolue selon le niveau
  export const renderEnemy = (ctx, x, y, frame, level = 1) => {
    const size = 4; // Taille d'un pixel
    const width = 8; // Largeur en pixels
    const height = 12; // Hauteur en pixels
    
    // Position de base pour dessiner l'ennemi
    const baseX = Math.floor(x - (width * size) / 2);
    const baseY = Math.floor(y - (height * size) / 2);
    
    // Couleurs de l'ennemi qui évoluent avec le niveau
    const headColor = level <= 3 ? COLORS.darkSkin : COLORS.purple;
    const bodyColor = level <= 2 ? COLORS.darkRed : (level <= 4 ? COLORS.purple : COLORS.black);
    const legColor = COLORS.black;
    
    // Taille qui augmente légèrement avec le niveau
    const sizeMultiplier = 1 + (level - 1) * 0.1; // +10% par niveau
    
    // Dessiner la tête
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        drawPixel(ctx, baseX + (i + 2) * size, baseY + j * size, size * sizeMultiplier, headColor);
      }
    }
    
    // Dessiner le corps
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        drawPixel(ctx, baseX + (i + 1) * size, baseY + (j + 4) * size, size * sizeMultiplier, bodyColor);
      }
    }
    
    // Animation de course pour les jambes
    const legOffset = Math.floor(frame / 2) % 2 === 0 ? 1 : -1;
    
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        drawPixel(ctx, baseX + (i + 2) * size, baseY + (j + 8 + legOffset) * size, size * sizeMultiplier, legColor);
        drawPixel(ctx, baseX + (i + 4) * size, baseY + (j + 8 - legOffset) * size, size * sizeMultiplier, legColor);
      }
    }
    
    // Animation de course pour les bras
    const armOffset = Math.floor(frame / 2) % 2 === 0 ? 1 : -1;
    
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        drawPixel(ctx, baseX + (i - 1) * size, baseY + (j + 4 + armOffset) * size, size * sizeMultiplier, bodyColor);
        drawPixel(ctx, baseX + (i + 7) * size, baseY + (j + 4 - armOffset) * size, size * sizeMultiplier, bodyColor);
      }
    }
    
    // Dessiner les yeux (regard menaçant qui évolue avec le niveau)
    const eyeColor = level <= 3 ? COLORS.white : COLORS.red;
    drawPixel(ctx, baseX + 3 * size, baseY + 2 * size, size * sizeMultiplier, eyeColor);
    drawPixel(ctx, baseX + 5 * size, baseY + 2 * size, size * sizeMultiplier, eyeColor);
    
    // Ajout d'effets spéciaux pour les niveaux avancés
    if (level >= 3) {
      // Aura sombre autour de l'ennemi
      ctx.beginPath();
      ctx.arc(x, y, 20 + level * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${level > 4 ? 255 : 0}, 0, 0, 0.2)`;
      ctx.fill();
    }
  };
  
  // Dessiner l'explosion
  export const renderExplosion = (ctx, x, y, frame) => {
    const maxRadius = 50;
    const radius = Math.min(frame * 5, maxRadius);
    
    // Gradient pour l'explosion
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, COLORS.yellow);
    gradient.addColorStop(0.5, COLORS.orange);
    gradient.addColorStop(1, COLORS.red);
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Ajouter des particules
    const particleCount = 20;
    const angleStep = (Math.PI * 2) / particleCount;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = i * angleStep;
      const particleRadius = radius * 0.8;
      const particleX = x + Math.cos(angle) * particleRadius * Math.random();
      const particleY = y + Math.sin(angle) * particleRadius * Math.random();
      const particleSize = 2 + Math.random() * 3;
      
      ctx.beginPath();
      ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? COLORS.yellow : COLORS.orange;
      ctx.fill();
    }
  };
  
  // Dessiner l'arrière-plan qui évolue avec le niveau
  export const renderBackground = (ctx, width, height, level = 1) => {
    // Couleurs qui évoluent avec le niveau
    const skyColors = [
      { start: COLORS.darkSky, end: COLORS.sky }, // Niveau 1
      { start: '#663366', end: '#aa5588' }, // Niveau 2
      { start: '#442244', end: '#884466' }, // Niveau 3
      { start: '#221133', end: '#553355' }, // Niveau 4
      { start: '#110022', end: '#330033' }  // Niveau 5+
    ];
    
    const skyColor = level <= 5 ? skyColors[level - 1] : skyColors[4];
    
    // Ciel dégradé
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height - 100);
    skyGradient.addColorStop(0, skyColor.start);
    skyGradient.addColorStop(1, skyColor.end);
    
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height - 100);
    
    // Sol
    ctx.fillStyle = level <= 3 ? COLORS.ground : '#221111';
    ctx.fillRect(0, height - 100, width, 100);
    
    // Montagnes en arrière-plan
    ctx.fillStyle = level <= 3 ? COLORS.gray : '#332222';
    
    // Plusieurs montagnes
    drawMountain(ctx, width * 0.2, height - 100, 150, 100);
    drawMountain(ctx, width * 0.5, height - 100, 200, 150);
    drawMountain(ctx, width * 0.8, height - 100, 180, 120);
    
    // Nuages qui deviennent plus sombres avec le niveau
    const cloudColor = level <= 2 ? COLORS.white : (level <= 4 ? '#ccaaaa' : '#aa5555');
    drawCloud(ctx, width * 0.1, height * 0.2, 60, cloudColor);
    drawCloud(ctx, width * 0.4, height * 0.1, 80, cloudColor);
    drawCloud(ctx, width * 0.7, height * 0.25, 70, cloudColor);
    
    // Soleil/lune dramatique qui change avec le niveau
    const celestialColors = [COLORS.orange, '#ffaa44', '#ff5544', '#aa3333', '#550000'];
    const celestialColor = level <= 5 ? celestialColors[level - 1] : celestialColors[4];
    
    ctx.fillStyle = celestialColor;
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.15, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Aura autour du soleil/lune
    const sunGlow = ctx.createRadialGradient(
      width * 0.85, height * 0.15, 40,
      width * 0.85, height * 0.15, 80
    );
    sunGlow.addColorStop(0, `rgba(${level > 3 ? 255 : 255}, ${level > 3 ? 0 : 119}, 0, 0.5)`);
    sunGlow.addColorStop(1, `rgba(${level > 3 ? 255 : 255}, ${level > 3 ? 0 : 119}, 0, 0)`);
    
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.15, 80, 0, Math.PI * 2);
    ctx.fill();
    
    // Effets spéciaux pour les niveaux avancés
    if (level >= 3) {
      // Éclairs dans le ciel
      const lightningCount = level - 2;
      for (let i = 0; i < lightningCount; i++) {
        drawLightning(ctx, width * Math.random(), 0, 3 + Math.random() * 5);
      }
    }
  };
  
  // Dessiner le pont avec apparence qui évolue selon le niveau
  export const renderBridge = (ctx, x, y, width, segments, level = 1) => {
    const segmentWidth = width / segments.length;
    
    // Couleurs du pont qui évoluent avec le niveau
    const bridgeColors = [
      { main: COLORS.wood, detail: COLORS.darkWood }, // Niveau 1
      { main: '#aa6633', detail: '#553311' }, // Niveau 2
      { main: '#995533', detail: '#442200' }, // Niveau 3
      { main: '#884422', detail: '#331100' }, // Niveau 4
      { main: '#773311', detail: '#220000' }  // Niveau 5+
    ];
    
    const bridgeColor = level <= 5 ? bridgeColors[level - 1] : bridgeColors[4];
    
    // Dessiner les piliers
    ctx.fillStyle = bridgeColor.detail;
    ctx.fillRect(x - 10, y, 20, 100);
    ctx.fillRect(x + width - 10, y, 20, 100);
    
    // Dessiner les segments du pont
    for (let i = 0; i < segments.length; i++) {
      if (segments[i] === 1) {
        // Segment intact
        ctx.fillStyle = bridgeColor.main;
        ctx.fillRect(x + i * segmentWidth, y - 10, segmentWidth, 10);
        
        // Détails du pont
        ctx.fillStyle = bridgeColor.detail;
        ctx.fillRect(x + i * segmentWidth + 2, y - 8, segmentWidth - 4, 2);
        ctx.fillRect(x + i * segmentWidth + 2, y - 4, segmentWidth - 4, 2);
      }
    }
  };
  
  // Fonction pour dessiner une montagne
  const drawMountain = (ctx, x, y, width, height) => {
    ctx.beginPath();
    ctx.moveTo(x - width / 2, y);
    ctx.lineTo(x, y - height);
    ctx.lineTo(x + width / 2, y);
    ctx.closePath();
    ctx.fill();
    
    // Ajouter de la neige au sommet
    ctx.fillStyle = COLORS.white;
    ctx.beginPath();
    ctx.moveTo(x - width / 6, y - height * 0.8);
    ctx.lineTo(x, y - height);
    ctx.lineTo(x + width / 6, y - height * 0.8);
    ctx.closePath();
    ctx.fill();
  };
  
  // Fonction pour dessiner un nuage avec couleur personnalisable
  const drawCloud = (ctx, x, y, size, color = COLORS.white) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.arc(x + size / 2, y - size / 4, size / 3, 0, Math.PI * 2);
    ctx.arc(x + size / 2, y + size / 4, size / 3, 0, Math.PI * 2);
    ctx.arc(x + size, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  };
  
  // Fonction pour dessiner un éclair
  const drawLightning = (ctx, x, y, width) => {
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    let currentY = y;
    const endY = y + 100 + Math.random() * 100;
    
    while (currentY < endY) {
      x += (Math.random() - 0.5) * 30;
      currentY += 10 + Math.random() * 20;
      ctx.lineTo(x, currentY);
    }
    
    ctx.stroke();
  };
  