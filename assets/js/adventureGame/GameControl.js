// GameControl.js
import GameLevel from "./GameLevel.js";
import GameLevelWater from "./GameLevelWater.js";
import GameLevelDesert from "./GameLevelDesert.js";

class GameControl {
    constructor(path, levelClasses=[GameLevelDesert, GameLevelWater]) {
        this.path = path;
        this.levelClasses = levelClasses; 
        this.currentLevel = null;
        this.currentLevelIndex = 0;
        this.currentPass = 0;
    }

    start() {
        this.addExitKeyListener();
        this.loadLevel();
    }

    loadLevel() {
        const GameLevelClass = this.levelClasses[this.currentLevelIndex];
        this.currentLevel = new GameLevel(this.path);
        this.currentLevel.create(GameLevelClass);
        this.gameLoop();
    }

    gameLoop() {
        if (!this.currentLevel.continue) {
            this.handleLevelEnd();
            return;
        }
        this.currentLevel.update();
        this.handleLevelStart();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    handleLevelStart() {
        if (this.currentLevelIndex === 0 && this.currentPass === 10) {
            alert("Start Level.");
        }
        this.currentPass++;
    }

    handleLevelEnd() {
        if (this.currentLevelIndex < this.levelClasses.length - 1) {
            alert("Level ended.");
        } else {
            alert("Game over. All levels completed.");
        }
        this.currentLevel.destroy();
        this.currentLevelIndex++;
        this.loadLevel();
    }

    addExitKeyListener() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.currentLevel.continue = false;
            }
        });
    }

}

export default GameControl;
