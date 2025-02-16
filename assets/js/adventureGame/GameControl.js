// GameControl.js
import GameLevel from "./GameLevel.js";
import GameLevelWater from "./GameLevelWater.js";
import GameLevelDesert from "./GameLevelDesert.js";

class GameControl {
    constructor(path, levelClasses = [GameLevelDesert, GameLevelWater]) {
        this.path = path;
        this.levelClasses = levelClasses;
        this.currentLevel = null;
        this.currentLevelIndex = 0;
        this.currentPass = 0;
        this.isPaused = false;
        this.exitKeyListener = this.handleExitKey.bind(this);
        this.onLevelEnd = null; // Callback for when the level ends
        this.savedCanvasState = []; // To save the canvas elements
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

    saveCanvasState() {
        const gameContainer = document.getElementById('gameContainer');
        const canvasElements = gameContainer.querySelectorAll('canvas');
        this.savedCanvasState = Array.from(canvasElements).map(canvas => {
            return {
                id: canvas.id,
                width: canvas.width,
                height: canvas.height,
                style: {
                    width: canvas.style.width,
                    height: canvas.style.height,
                    position: canvas.style.position,
                    left: canvas.style.left,
                    top: canvas.style.top
                },
                imageData: canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
            };
        });
    }

    hideCanvasState() {
        const gameContainer = document.getElementById('gameContainer');
        const canvasElements = gameContainer.querySelectorAll('canvas');
        canvasElements.forEach(canvas => {
            if (canvas.id !== 'gameCanvas') {
                canvas.style.display = 'none';
            }
        });
    }

    showCanvasState() {
        const gameContainer = document.getElementById('gameContainer');
        this.savedCanvasState.forEach(state => {
            const canvas = document.getElementById(state.id);
            if (canvas) {
                canvas.style.display = state.style.display || 'block';
                canvas.getContext('2d').putImageData(state.imageData, 0, 0);
            }
        });
    }

    pause() {
        this.isPaused = true;
        this.removeExitKeyListener();
        this.saveCanvasState();
        this.hideCanvasState();
     }

    resume() {
        this.isPaused = false;
        this.addExitKeyListener();
        this.showCanvasState();
        this.gameLoop();
    }
}

export default GameControl;