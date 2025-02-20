import Background from './Background.js';
import Player from './Player.js';
import Bomb from './Projectile.js';

class GameLevelStarWars {
  constructor(gameEnv) {
    // Values dependent on GameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_atat = path + "/images/gamify/atat_background.png"; // be sure to include the path
    const image__data_atat = {
        id: 'AT-AT-Background',
        src: image_src_atat,
        pixels: {height: 570, width: 1025}
    };

    // Player data for snowspeeder
    const sprite_src_snowspeeder = path + "/images/gamify/snowspeeder_sprite.png"; // be sure to include the path
    const SNOWSPEEDER_SCALE_FACTOR = 6;
    const sprite_data_snowspeeder = {
        id: 'Snowspeeder',
        greeting: "Hi I am snowspeeder, the desert wanderer. I am trying to take donwn the empire's AT-ATs!",
        src: sprite_src_snowspeeder,
        SCALE_FACTOR: SNOWSPEEDER_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: 0 }, 
        pixels: {height: 577, width: 433},
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1, rotate: -Math.PI/2 },
        left: {row: 0, start: 0, columns: 1 },
        right: {row: 0, start: 0, columns: 1, rotate: Math.PI },
        up: {row: 0, start: 0, columns: 1, rotate: Math.PI/2 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    // Bomb data, temporary sprite for testing
    const sprite_src_bomb = path + "/images/gamify/laser_bolt.png"; // be sure to include the path
    const sprite_data_bomb = {
        id: 'AT-AT-Bomb',
        greeting: "Simulate explosive action!",
        // define image/sprite data
        src: sprite_src_bomb,
        pixels: {height: 154, width: 525}, // height and width of the image
        orientation: {rows: 1, columns: 1 }, // normalized rows and columns in the sprite
        // define size, position, adjustments for hitbox
        SCALE_FACTOR: 20,  // Start small 1/20 scale and grow
        INIT_POSITION_RATIO: { x: 1 / 1.78, y: 1 / 3.3 }, // Ratios for initial position
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // define animation properties
        ANIMATION_RATE: 50, // 1/50th of the frame rate for redraw
        TRANSLATE_SCALE_FACTOR: 10, // Grow to 1/10 scale at end of translation
        TRANSLATE_POSITION_RATIO: { x: 1 / 2.22, y: 1 / 2.7 }, // Ratios for translate position
        TRANSLATE_SIMULATION: {miliseconds: 1000, steps: 10}, // 1 second, 10 steps
        down: {row: 0, start: 0, columns: 1},  // This is the stationary bomb, down is default
     };

    // List of objects definitions for this level
    this.classes = [
      { class: Background, data: image__data_atat },
      { class: Player, data: sprite_data_snowspeeder },
      { class: Bomb, data: sprite_data_bomb },
    ];
  }
}

export default GameLevelStarWars;