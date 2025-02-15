// GameLevel.js
import GameEnv from "./GameEnv.js";

class GameLevel {
    constructor(path) {
        this.path = path;
        this.gameEnv = new GameEnv();
    }

    create(GameLevelClass) {
        this.continue = true;
        this.gameEnv.create();
        this.gameLevel = new GameLevelClass(this.path, this.gameEnv);
        this.gameObjectClasses = this.gameLevel.classes;
        for (let gameObjectClass of this.gameObjectClasses) {
            if (!gameObjectClass.data) gameObjectClass.data = {};
            let gameObject = new gameObjectClass.class(gameObjectClass.data, this.gameEnv);
            this.gameEnv.gameObjects.push(gameObject);
        }
        // Add event listener for window resize
        window.addEventListener('resize', this.resize.bind(this));
    }

    destroy() {
        for (let index = this.gameEnv.gameObjects.length - 1; index >= 0; index--) {
             this.gameEnv.gameObjects[index].destroy();
        }
        // Remove event listener for window resize
        window.removeEventListener('resize', this.resize.bind(this));
    }

    update() {
        this.gameEnv.clear();
        for (let gameObject of this.gameEnv.gameObjects) {
            gameObject.update();
        }
    }

    resize() {
        this.gameEnv.resize();
        for (let gameObject of this.gameEnv.gameObjects) {
            gameObject.resize();
        }
    }

}

export default GameLevel;