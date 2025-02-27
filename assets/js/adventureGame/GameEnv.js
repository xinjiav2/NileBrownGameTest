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
    // Store game environment and context
    this.gameEnv = gameEnv;
    this.ctx = gameEnv.ctx;
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;
    
    // Debug flag - set to true to see debug information
    this.debug = true;

    // Background data
    const image_src_water = path + "/images/gamify/water.jpg";
    const image_data_water = {
        id: 'Water',
        src: image_src_water,
        pixels: {height: 597, width: 340}
    };

    // Player Data for Octopus
    const sprite_src_octopus = path + "/images/gamify/octopus.png";
    const OCTOPUS_SCALE_FACTOR = 5;
    const sprite_data_octopus = {
        id: 'Octopus',
        greeting: "Hi I am Octopus, the water wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_octopus,
        SCALE_FACTOR: OCTOPUS_SCALE_FACTOR,
        STEP_FACTOR: 50,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 50, y: height - 100 },
        pixels: {height: 250, width: 167},
        orientation: {rows: 3, columns: 2 },
        down: {row: 0, start: 0, columns: 2 },
        left: {row: 1, start: 0, columns: 2, mirror: true },
        right: {row: 1, start: 0, columns: 2 },
        up: {row: 0, start: 0, columns: 2},
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 }, // W, A, S, D
        
        // This is important - override the default keyEvent handler
        keyEvent: function(event, gameObjects, gameLevel) {
            // Only handle keydown events
            if (event.type !== "keydown") return false;
            
            // Find player object
            let player = null;
            for (let gameObject of gameObjects) {
                if (gameObject.id === this.id) {
                    player = gameObject;
                    break;
                }
            }
            if (!player) return false;
            
            // Get key that was pressed
            const key = event.keyCode;
            
            // Check direction keys
            if (key === this.keypress.up || 
                key === this.keypress.down || 
                key === this.keypress.left || 
                key === this.keypress.right) {
                
                let newX = player.x;
                let newY = player.y;
                let direction = "";
                
                // Calculate new position
                if (key === this.keypress.up) {
                    direction = "up";
                    newY -= this.STEP_FACTOR;
                } else if (key === this.keypress.down) {
                    direction = "down";
                    newY += this.STEP_FACTOR;
                } else if (key === this.keypress.left) {
                    direction = "left";
                    newX -= this.STEP_FACTOR;
                } else if (key === this.keypress.right) {
                    direction = "right";
                    newX += this.STEP_FACTOR;
                }
                
                // Check if we can move to the new position
                if (gameLevel.canMoveTo(newX, newY)) {
                    player.x = newX;
                    player.y = newY;
                    player.currentDirection = direction;
                    return true; // We handled this event
                }
            }
            
            return false; // We did not handle this event
        }
    };

    // NPC Data for the Java Portal
    const sprite_src_nomad = path + "/images/gamify/animwizard.png";
    const sprite_data_nomad = {
        id: 'JavaWorld',
        greeting: "Hi I am Java Portal. Leave this world and go on a Java adventure!",
        src: sprite_src_nomad,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 100,
        pixels: {height: 307, width: 813},
        INIT_POSITION: { x: (width * 3 / 4), y: (height * 3 / 4)},
        orientation: {rows: 3, columns: 7 },
        down: {row: 1, start: 0, columns: 6 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        interact: function() {
          let primaryGame = gameEnv.gameControl;
          let levelArray = [GameLevelStarWars];
          let gameInGame = new GameControl(path, levelArray);
          primaryGame.pause();
          gameInGame.start();
          gameInGame.gameOver = function() {
            primaryGame.resume();
          }
        }
    };

    // Maze data - defining the walls and paths
    this.maze = [
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
    
    // Calculate tile size based on screen width and maze dimensions
    this.tileSize = Math.min(
        Math.floor(width / this.maze[0].length),
        Math.floor(height / this.maze.length)
    );
    
    // Create object instances and store
    this.classes = [
        { class: Background, data: image_data_water },
        { class: Player, data: sprite_data_octopus },
        { class: Npc, data: sprite_data_nomad }
    ];
    
    // Store for game objects
    this.gameObjects = [];
  }

  // Initialize the game level - called when the level starts
  initialize() {
    console.log("GameLevelWater initializing...");
    
    // Create all game objects from the classes list
    this.gameObjects = [];
    for (const obj of this.classes) {
        const instance = new obj.class(obj.data);
        instance.initialize(this.gameEnv);
        this.gameObjects.push(instance);
    }
    
    // Store a reference to this level in the game environment
    this.gameEnv.gameLevel = this;
    
    console.log("GameLevelWater initialization complete.");
    console.log("Maze dimensions:", this.maze[0].length, "x", this.maze.length);
    console.log("Tile size:", this.tileSize);
  }
  
  // Check if player can move to the specified coordinates
  canMoveTo(x, y) {
    // Check boundaries
    if (x < 0 || y < 0) return false;
    
    // Convert from pixel coordinates to maze grid coordinates
    const mazeX = Math.floor(x / this.tileSize);
    const mazeY = Math.floor(y / this.tileSize);
    
    // Check if coordinates are within maze boundaries
    if (mazeY >= this.maze.length || mazeX >= this.maze[0].length) {
        if (this.debug) console.log("Out of bounds:", mazeX, mazeY);
        return false;
    }
    
    // Check if this position is a path (0) or wall (1)
    const isPath = this.maze[mazeY][mazeX] === 0;
    
    if (this.debug && !isPath) {
        console.log("Hit wall at:", mazeX, mazeY);
    }
    
    return isPath;
  }
  
  // Draw the maze walls
  renderMaze(ctx) {
    const wallColor = 'rgba(0, 0, 128, 0.8)'; // Deep blue for underwater walls
    ctx.fillStyle = wallColor;
    
    // Draw each wall tile
    for (let y = 0; y < this.maze.length; y++) {
        for (let x = 0; x < this.maze[y].length; x++) {
            if (this.maze[y][x] === 1) {
                ctx.fillRect(
                    x * this.tileSize, 
                    y * this.tileSize, 
                    this.tileSize, 
                    this.tileSize
                );
            }
        }
    }
    
    // In debug mode, also draw grid lines
    if (this.debug) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        for (let y = 0; y <= this.maze.length; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * this.tileSize);
            ctx.lineTo(this.maze[0].length * this.tileSize, y * this.tileSize);
            ctx.stroke();
        }
        
        for (let x = 0; x <= this.maze[0].length; x++) {
            ctx.beginPath();
            ctx.moveTo(x * this.tileSize, 0);
            ctx.lineTo(x * this.tileSize, this.maze.length * this.tileSize);
            ctx.stroke();
        }
    }
  }
  
  // Game update function called on each frame
  update(gameObjects) {
    // Update game logic here if needed
    // This method is typically called by the game engine on each frame
  }
  
  // Draw function called on each frame
  draw() {
    // Make sure we have a context to draw on
    if (!this.ctx) {
        console.error("No drawing context available");
        return;
    }
    
    // Render the maze walls
    this.renderMaze(this.ctx);
    
    // In debug mode, display player position
    if (this.debug) {
        const player = this.gameObjects.find(obj => obj.id === 'Octopus');
        if (player) {
            this.ctx.font = '14px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(`Player: ${Math.floor(player.x)}, ${Math.floor(player.y)}`, 10, 20);
            this.ctx.fillText(`Grid: ${Math.floor(player.x / this.tileSize)}, ${Math.floor(player.y / this.tileSize)}`, 10, 40);
            
            // Highlight the player's current tile
            const tileX = Math.floor(player.x / this.tileSize);
            const tileY = Math.floor(player.y / this.tileSize);
            this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(
                tileX * this.tileSize,
                tileY * this.tileSize,
                this.tileSize,
                this.tileSize
            );
        }
    }
  }

  // Hook for game control to make this level handle keyboard events
  handleKeyEvent(event, gameObjects) {
    // Find the player object
    const player = gameObjects.find(obj => obj.id === 'Octopus');
    if (!player || !player.keyEvent) return false;
    
    // Let the player's keyEvent handler deal with it, passing this level for collision detection
    return player.keyEvent(event, gameObjects, this);
  }
}

export default GameLevelWater;

