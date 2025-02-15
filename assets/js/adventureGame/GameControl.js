// GameControl.js
import GameLevel from "./GameLevel.js";
import GameLevelWater from "./GameLevelWater.js";
import GameLevelDesert from "./GameLevelDesert.js";

class GameControl {
    constructor(path, levelClasses=[GameLevelDesert, GameLevelWater]) {
        this.path = path;
        this.levelClasses = levelClasses; 
        this.currentLevelIndex = 0;
        this.currentGameLevel = null;
        this.currentPass = 0;
        this.savedLevelState = null;
        this.currentLevel = null;
    }

    start() {
        this.addExitKeyListener();
        this.loadLevel();
    }

    loadLevel() {
        const GameLevelClass = this.levelClasses[this.currentLevelIndex];
        this.currentLevel = new GameLevel(this.path);
        this.currentLevel.loadLevelObjects(GameLevelClass);
        this.gameLoop();
    }

    gameLoop() {
        if (!this.currentLevel.continue) {
            this.handleLevelEnd();
            return;
        }
        this.currentLevel.updateLevelObjects();
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
        for (let index = this.currentLevel.gameObjects.length - 1; index >= 0; index--) {
            this.currentLevel.gameObjects[index].destroy();
        }
        this.currentLevelIndex++;
        this.loadLevel();
    }

    resize() {
        this.resizeLevel();
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
