import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Npc from './Npc.js';
import Player from './Player.js';
import Prompt from './Prompt.js';

class GameLevelWaterJavaNomad {
  constructor(path,gameEnv) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    // Values dependent on GameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;

    // Background data
    const image_src_forest = path + "/images/gamify/forest.png";
    const image__data_forest = {
        id: 'Forest',
        src: image_src_forest,
        pixels: {height: 315, width: 250}
    };

    // List of objects definitions for this level
    this.classes = [
      { class: Background, data: image__data_forest },
    ];
  }
}

export default GameLevelWaterJavaNomad;