import Background from './Background.js';
import Player from './Player.js';
import Bomb from './Bomb.js';

class GameLevelStarWars {
  constructor(gameEnv) {
    // Values dependent on GameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_atat = path + "/images/gamify/atat_background.png"; // be sure to include the path
    const image__data_atat = {
        id: 'atat',
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
    const sprite_src_bomb = path + "/images/gamify/tux.png"; // be sure to include the path
    const sprite_data_bomb = {
        id: 'Tux',
        greeting: "Simulate explosive",
        src: sprite_src_bomb,
        SCALE_FACTOR: 20,  // Start small 1/20 scale and grow
        TRANSLATE_SCALE_FACTOR: 10, // Grow to 1/10 scale at end of translation
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 352},
        INIT_POSITION: { x: (width / 1.78), y: (height / 3.3)},
        TRANSLATE_POSITION: { x: (width / 2.22), y: (height / 2.7)},
        orientation: {rows: 8, columns: 11, translate: {miliseconds: 1000, steps: 10} },
        down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
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