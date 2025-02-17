import Background from './Background.js';
import Player from './Player.js';

class GameLevelStarWars {
  constructor(gameEnv) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
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
        INIT_POSITION: { x: 0, y: height - (height/SNOWSPEEDER_SCALE_FACTOR) }, 
        pixels: {height: 577, width: 433},
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },
        left: {row: 0, start: 0, columns: 1 },
        right: {row: 0, start: 0, columns: 1 },
        up: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    // List of objects definitions for this level
    this.classes = [
      { class: Background, data: image__data_atat },
      { class: Player, data: sprite_data_snowspeeder },
    ];
  }
}

export default GameLevelStarWars;