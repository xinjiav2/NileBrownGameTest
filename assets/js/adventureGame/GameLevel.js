// GameLevel.js
import GameEnv from "./GameEnv.js";

class GameLevel {
    constructor(path) {
        this.path = path;
        this.gameEnv = new GameEnv();
    }

    loadLevelObjects(GameLevelClass) {
        this.continue = true;
        this.gameEnv.create();
        this.gameLevel = new GameLevelClass(this.path, this.gameEnv);
        this.gameObjectClasses = this.gameLevel.classes;
        for (let gameObjectClass of this.gameObjectClasses) {
            if (!gameObjectClass.data) gameObjectClass.data = {};
            let gameObject = new gameObjectClass.class(gameObjectClass.data, this.gameEnv);
            this.gameEnv.gameObjects.push(gameObject);
        }
    }

    updateLevelObjects() {
        this.gameEnv.clear();
        for (let gameObject of this.gameEnv.gameObjects) {
            gameObject.update();
        }
    }

    resizeLevel() {
        this.gameEnv.resize();
        for (let gameObject of this.gameEnv.gameObjects) {
            gameObject.resize();
        }
    }

}

export default GameLevel;