import Background from './Background.js';
import Npc from './Npc.js';
import Player from './Player.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';

class GameLevelWater {
  constructor(gameEnv) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;
    let gameControl = gameEnv.gameControl;

    // Background data
    const image_src_water = path + "/images/gamify/deepseadungeon.jpeg";
    const image_data_water = {
        id: 'Water',
        src: image_src_water,
        pixels: {height: 597, width: 340}
    };

    const sprite_src_octopus = path + "/images/gamify/octopus.png"; // be sure to include the path
    const OCTOPUS_SCALE_FACTOR = 5;
    const sprite_data_octopus = {
        id: 'Octopus',
        greeting: "Hi I am Octopus, the water wanderer. I am looking for wisdome and adventure!",
        src: sprite_src_octopus,
        SCALE_FACTOR: OCTOPUS_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/OCTOPUS_SCALE_FACTOR) }, 
        pixels: {height: 250, width: 167},
        orientation: {rows: 3, columns: 2 },
        down: {row: 0, start: 0, columns: 2 },
        left: {row: 1, start: 0, columns: 2 },
        right: {row: 1, start: 0, columns: 2 },
        up: {row: 0, start: 0, columns: 2},
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    // NPC Data for Byte Nomad (Smaller Version)
    const sprite_src_nomad = path + "/images/gamify/animwizard.png"; // be sure to include the path
    const sprite_data_nomad = {
        id: 'JavaWorld',
        greeting: "Hi I am Java Portal.  Leave this world and go on a Java adventure!",
        src: sprite_src_nomad,
        SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 100,
        pixels: {height: 307, width: 813},
        INIT_POSITION: { x: (width * 3 / 4), y: (height * 3 / 4)},
        orientation: {rows: 3, columns: 7 },
        down: {row: 1, start: 0, columns: 6 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        interact: function() {
          // Pause GameControl on main game .pause() method
          gameControl.pause();
          let level = [GameLevelStarWars];
          let gameInGame = new GameControl(path,level);
          gameInGame.start();
          gameInGame.onLevelEnd = function() {
            // Resume GameControl on main game .resume() method
            gameControl.resume();
          }
        }

      };


    // List of objects definitions for this level
    this.classes = [
      { class: Background, data: image_data_water },
      { class: Player, data: sprite_data_octopus },
      { class: Npc, data: sprite_data_nomad },
    ];
  }
}

export default GameLevelWater;