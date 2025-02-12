// To build GameLevels, each contains GameObjects from below imports
import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';

class GameLevelDesert {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_desert = path + "/images/gamify/desert.png"; 
    const image_data_desert = {
        name: 'desert',
        greeting: "Welcome to the desert! It is hot and dry here, but there are many adventures to be had!",
        src: image_src_desert,
        pixels: { height: 580, width: 1038 }
    };

    // Prompt the user for character selection
    let selectedCharacter = window.prompt("Choose your character: Type '1' for Chillguy or '2' for Octoups", "1");

    // Default to Chillguy if input is invalid
    selectedCharacter = (selectedCharacter === "2") ? "octopus" : "chillguy";

    console.log(`You selected: ${selectedCharacter}`);

    // Define player character based on selection
    const playerData = (selectedCharacter === "chillguy") 
        ? {
            id: 'Chill Guy',
            greeting: "Hi, I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
            src: path + "/images/gamify/chillguy.png",
            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: height - (height / 5) }, 
            pixels: { height: 384, width: 512 },
            orientation: { rows: 3, columns: 4 },
            down: { row: 0, start: 0, columns: 3 },
            left: { row: 2, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            up: { row: 3, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        }
        : {
            id: 'Octopus',
            greeting: "Hi, I am Octopus, the water wanderer. I am looking for wisdom and adventure!",
            src: path + "/images/gamify/octopus.png",
            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: height - (height / 5) }, 
            pixels: { height: 250, width: 167 },
            orientation: { rows: 3, columns: 2 },
            down: { row: 0, start: 0, columns: 2 },
            left: { row: 1, start: 0, columns: 2 },
            right: { row: 1, start: 0, columns: 2 },
            up: { row: 0, start: 0, columns: 2 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        };

    // NPC data
    const sprite_src_tux = path + "/images/gamify/tux.png";
    const sprite_data_tux = {
        id: 'Tux',
        greeting: "Hi, I am Tux, the Linux mascot. I am very happy to spend some Linux shell time with you!",
        src: sprite_src_tux,
        SCALE_FACTOR: 8,
        ANIMATION_RATE: 50,
        pixels: { height: 256, width: 352 },
        INIT_POSITION: { x: (width / 2), y: (height / 2) },
        orientation: { rows: 8, columns: 11 },
        down: { row: 5, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 }
    };

    const sprite_src_octocat = path + "/images/gamify/octocat.png";
    const sprite_data_octocat = {
        id: 'Octocat',
        greeting: "Hi, I am Octocat! I am the GitHub code collaboration mascot.",
        src: sprite_src_octocat,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 50,
        pixels: { height: 301, width: 801 },
        INIT_POSITION: { x: (width / 4), y: (height / 4) },
        orientation: { rows: 1, columns: 4 },
        down: { row: 0, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 }
    };

    const sprite_src_robot = path + "/images/gamify/robot.png";
    const sprite_data_robot = {
        id: 'Robot',
        greeting: "Hi, I am Robot, the Jupyter Notebook mascot. I love Linux shell time!",
        src: sprite_src_robot,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 100,
        pixels: { height: 316, width: 627 },
        INIT_POSITION: { x: (width * 3 / 4), y: (height * 3 / 4) },
        orientation: { rows: 3, columns: 6 },
        down: { row: 1, start: 0, columns: 6 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 }
    };

    // List of objects definitions for this level
    this.objects = [
        { class: Background, data: image_data_desert },
        { class: Player, data: playerData }, // Dynamically set player character
        { class: Npc, data: sprite_data_tux },
        { class: Npc, data: sprite_data_octocat },
        { class: Npc, data: sprite_data_robot }
    ];
  }
}

export default GameLevelDesert;
