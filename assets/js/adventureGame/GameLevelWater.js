import Background from './Background.js';
import Npc from './Npc.js';
import Player from './Player.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';

class GameLevelWater {
  /**
   * Properties and methods to define a game level
   * @param {*} gameEnv - The active game environment
   */
  constructor(gameEnv) {
    // Dependencies to support game level creation
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;
    this.gameEnv = gameEnv; // Store the game environment

    // Background data
    const image_src_water = path + "/images/gamify/water.jpg";
    const image_data_water = {
        id: 'Water',
        src: image_src_water,
        pixels: {height: 597, width: 340}
    };

    // Player Data for Octopus
    const sprite_src_octopus = path + "/images/gamify/octopus.png"; // be sure to include the path
    const OCTOPUS_SCALE_FACTOR = 5;
    const sprite_data_octopus = {
        id: 'Octopus',
        greeting: "Hi I am Octopus, the water wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_octopus,
        SCALE_FACTOR: OCTOPUS_SCALE_FACTOR,
        STEP_FACTOR: 50, // Adjusted for better movement in the maze
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 50, y: height - 100 }, // Adjusted initial position
        pixels: {height: 250, width: 167},
        orientation: {rows: 3, columns: 2 },
        down: {row: 0, start: 0, columns: 2 },
        left: {row: 1, start: 0, columns: 2, mirror: true }, // mirror is used to flip the sprite
        right: {row: 1, start: 0, columns: 2 },
        up: {row: 0, start: 0, columns: 2},
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 }, // W, A, S, D
        // Add custom move method to check maze collision
        move: (key, gameObjects) => {
          // Find player object
          const player = gameObjects.find(obj => obj.id === 'Octopus');
          if (!player) return;
          
          let newX = player.x;
          let newY = player.y;
          
          // Determine direction based on key
          let direction = '';
          if (key === player.keypress.up) direction = 'up';
          else if (key === player.keypress.down) direction = 'down';
          else if (key === player.keypress.left) direction = 'left';
          else if (key === player.keypress.right) direction = 'right';
          else return;
          
          // Calculate new position
          switch (direction) {
            case 'up':
              newY -= player.STEP_FACTOR;
              break;
            case 'down':
              newY += player.STEP_FACTOR;
              break;
            case 'left':
              newX -= player.STEP_FACTOR;
              break;
            case 'right':
              newX += player.STEP_FACTOR;
              break;
          }
          
          // Check if can move to new position using the level's canMoveTo method
          if (this.gameEnv.currentLevel.canMoveTo(newX, newY)) {
            player.x = newX;
            player.y = newY;
            player.currentDirection = direction;
          }
          
          return true; // Handled the keypress
        }
    };

    // NPC Data for Byte Nomad (Smaller Version)
    const sprite_src_nomad = path + "/images/gamify/animwizard.png"; // be sure to include the path
    const sprite_data_nomad = {
        id: 'JavaWorld',
        greeting: "Hi I am Java Portal. Leave this world and go on a Java adventure!",
        src: sprite_src_nomad,
        SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 100,
        pixels: {height: 307, width: 813},
        INIT_POSITION: { x: (width * 3 / 4), y: (height * 3 / 4)},
        orientation: {rows: 3, columns: 7 },
        down: {row: 1, start: 0, columns: 6 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        /* Interact function
        *  This function is called when the player interacts with the NPC
        *  It pauses the main game, creates a new GameControl instance with the StarWars level,
        */
        interact: function() {
          // Set a primary game reference from the game environment
          let primaryGame = gameEnv.gameControl;
          // Define the game in game level
          let levelArray = [GameLevelStarWars];
          // Define a new GameControl instance with the StarWars level
          let gameInGame = new GameControl(path, levelArray);
          // Pause the primary game 
          primaryGame.pause();
          // Start the game in game
          gameInGame.start();
          // Setup "callback" function to allow transition from game in game to the underlying game
          gameInGame.gameOver = function() {
            // Call .resume on primary game
            primaryGame.resume();
          }
        }
    };

    // Maze data
    const maze = [
      // Define the maze structure here
      // Example: 0 = path, 1 = wall
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // List of classes and supporting definitions to create the game level
    this.classes = [
      { class: Background, data: image_data_water },
      { class: Player, data: sprite_data_octopus },
      { class: Npc, data: sprite_data_nomad },
    ];

    // Add maze to the game environment
    this.maze = maze;
    this.tileSize = width / maze[0].length; // Define the size of each tile in the maze
    
    // Create a property to store game objects
    this.gameObjects = [];
  }

  // Method to check if the player can move to a new position
  canMoveTo(x, y) {
    // Make sure x and y are within bounds
    if (x < 0 || y < 0) return false;
    
    const mazeX = Math.floor(x / this.tileSize);
    const mazeY = Math.floor(y / this.tileSize);
    
    // Check if the coordinates are within the maze boundaries
    if (mazeY >= this.maze.length || mazeX >= this.maze[0].length) {
      return false;
    }
    
    // Check if the tile is a path (0)
    return this.maze[mazeY] && this.maze[mazeY][mazeX] === 0;
  }

  // Method to render the maze
  renderMaze(ctx) {
    const wallColor = 'rgba(0, 0, 128, 0.7)'; // Semi-transparent blue for underwater walls
    ctx.fillStyle = wallColor;
    
    for (let y = 0; y < this.maze.length; y++) {
      for (let x = 0; x < this.maze[y].length; x++) {
        if (this.maze[y][x] === 1) {
          ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
  }

  // Initialize game level - called once at the start
  initialize() {
    // Initialize all game objects
    this.gameObjects = this.classes.map(obj => {
      const instance = new obj.class(obj.data);
      instance.initialize();
      return instance;
    });
    
    // Store reference to this level in the game environment
    this.gameEnv.currentLevel = this;
  }

  // Update game logic - called on each frame
  update(gameObjects) {
    // Update game objects if needed
    // gameObjects would be the game objects from the game engine
  }

  // Draw method - called on each frame
  draw(ctx) {
    // First draw the background
    // Then draw the maze
    this.renderMaze(ctx);
    
    // Game objects (player, NPCs) will be drawn by the game engine
  }
}

export default GameLevelWater;