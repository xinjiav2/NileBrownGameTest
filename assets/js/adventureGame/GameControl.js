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
        this.isPaused = false;
        this.exitKeyListener = this.handleExitKey.bind(this);
        this.onLevelEnd = null; // Callback for when the level ends
    }

    start() {
        this.addExitKeyListener();
        this.transitionToLevel();
    }

    transitionToLevel() {
        const GameLevelClass = this.levelClasses[this.currentLevelIndex];
        this.currentLevel = new GameLevel(this);
        this.currentLevel.create(GameLevelClass);
        this.gameLoop();
    }

    gameLoop() {
        if (!this.currentLevel.continue) {
            this.handleLevelEnd();
            return;
        }
        if (this.isPaused) {
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
        // Call the onLevelEnd callback if it exists
        if (this.onLevelEnd) {
            this.onLevelEnd();
        } else {
            this.currentLevelIndex++;
            this.transitionToLevel();
        }
    }

    handleExitKey(event) {
        if (event.key === 'Escape') {
            this.currentLevel.continue = false;
        }
    }

    addExitKeyListener() {
        document.addEventListener('keydown', this.exitKeyListener);
    }

    removeExitKeyListener() {
        document.removeEventListener('keydown', this.exitKeyListener);
    }

    pause() {
        this.isPaused = true;
        this.removeExitKeyListener();
    }

    resume() {
        this.isPaused = false;
        this.addExitKeyListener();
        this.gameLoop();
    }

}

export default GameControl;
