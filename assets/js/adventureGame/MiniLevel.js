import GameEnv from "./GameEnv.js";
import Background from "./Background.js";
import Player from "./Player.js";
import Npc from "./Npc.js";
class MiniLevel {
    constructor(path) {
        let width = GameEnv.innerWidth;
        let height = GameEnv.innerHeight;
        // Mini-level Background
        const image_src_mini = path + "/images/gamify/deepseadungeon.jpeg";
        const image_data_mini = {
            name: "Mini Game",
            greeting: "Welcome to the mini-game!",
            src: image_src_mini,
            pixels: { height: 580, width: 1038 },
        };
        // Player Configuration
        const sprite_src_player = path + "/images/gamify/chillguy.png";
        const CHILLGUY_SCALE_FACTOR = 5;
        const player_data = {
            id: "MiniPlayer",
            greeting: "Let's play this mini-game!",
            src: sprite_src_player,
            SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: height - (height/CHILLGUY_SCALE_FACTOR) }, 
            pixels: {height: 384, width: 512},
            orientation: {rows: 3, columns: 4 },
            down: {row: 0, start: 0, columns: 3 },
            left: {row: 2, start: 0, columns: 3 },
            right: {row: 1, start: 0, columns: 3 },
            up: {row: 3, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        };
        // NPC for the Mini-Level
        const sprite_src_npc = path + "/images/gamify/tux.png";
        const npc_data = {
            id: "MiniNPC",
            greeting: "Solve the puzzle to return!",
            src: sprite_src_npc,
            SCALE_FACTOR: 8,  // Adjust this based on your scaling needs
            ANIMATION_RATE: 50,
            pixels: {height: 256, width: 352},
            INIT_POSITION: { x: (width / 2), y: (height / 2)},
            orientation: {rows: 8, columns: 11 },
            down: {row: 5, start: 0, columns: 3 },  // This is the stationary npc, down is default 
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        };
        // List of objects in the Mini-Level
        this.objects = [
            { class: Background, data: image_data_mini },
            { class: Player, data: player_data },
            { class: Npc, data: npc_data },
        ];
    }
}
export default MiniLevel;