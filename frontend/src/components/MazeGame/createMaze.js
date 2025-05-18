// createMaze.js
const createMaze = (width, height) => {
    // Initialiser le labyrinthe avec des murs (0)
    const maze = Array(height).fill().map(() => Array(width).fill(0));
    
    // Fonction récursive pour creuser des chemins
    const carve = (x, y) => {
      // Marquer cette cellule comme un chemin (1)
      maze[y][x] = 1;
      
      // Directions possibles: haut, droite, bas, gauche
      const directions = [
        [0, -2], [2, 0], [0, 2], [-2, 0]
      ];
      
      // Mélanger les directions pour obtenir un labyrinthe aléatoire
      directions.sort(() => Math.random() - 0.5);
      
      // Explorer chaque direction
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        
        // Vérifier si la nouvelle position est dans les limites et n'a pas été visitée
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && maze[ny][nx] === 0) {
          // Creuser un passage entre la cellule actuelle et la nouvelle
          maze[y + dy/2][x + dx/2] = 1;
          carve(nx, ny);
        }
      }
    };
    
    // Commencer à creuser depuis le coin supérieur gauche
    carve(1, 1);
    
    // Créer une entrée et une sortie
    maze[1][0] = 1; // Entrée
    maze[height - 2][width - 1] = 1; // Sortie
    
    return maze;
  };
  
  export default createMaze;
  