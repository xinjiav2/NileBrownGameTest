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
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
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
  }

  // Method to check if the player can move to a new position
  canMoveTo(x, y) {
    const mazeX = Math.floor(x / this.tileSize);
    const mazeY = Math.floor(y / this.tileSize);
    return this.maze[mazeY] && this.maze[mazeY][mazeX] === 0;
  }

  // Method to handle player movement
  handlePlayerMovement(player, direction) {
    let newX = player.x;
    let newY = player.y;

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

    if (this.canMoveTo(newX, newY)) {
      player.x = newX;
      player.y = newY;
    }
  }

  // Method to render the maze
  renderMaze(ctx) {
    ctx.fillStyle = 'red';
    for (let y = 0; y < this.maze.length; y++) {
      for (let x = 0; x < this.maze[y].length; x++) {
        if (this.maze[y][x] === 1) {
          ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
  }

  // Method to start the game
  startGame(ctx) {
    // Initialize game objects and start the game
    this.classes.forEach(obj => {
      const instance = new obj.class(obj.data);
      instance.initialize();
    });

    // Render the maze
    this.renderMaze(ctx);
  }
}

export default GameLevelWater;