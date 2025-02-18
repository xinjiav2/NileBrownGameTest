import Character from './Character.js';

class Bomb extends Character {
    constructor(data, gameEnv) {
        super(data, gameEnv);
        this.data = data;
        this.startTime = Date.now();
        this.duration = data.orientation.translate.miliseconds;
        this.steps = data.orientation.translate.steps;
        this.startPosition = { ...data.INIT_POSITION };
        this.endPosition = { ...data.TRANSLATE_POSITION };
        this.startScaleFactor = data.SCALE_FACTOR;
        this.endScaleFactor = data.TRANSLATE_SCALE_FACTOR;
    }

    update() {
        const elapsedTime = Date.now() - this.startTime;
        const progress = Math.min(elapsedTime / this.duration, 1);
        const step = Math.floor(progress * this.steps);

        // Calculate the new position
        this.position.x = this.startPosition.x + (this.endPosition.x - this.startPosition.x) * progress;
        this.position.y = this.startPosition.y + (this.endPosition.y - this.startPosition.y) * progress;

        // Calculate the new scale factor
        this.scaleFactor = this.startScaleFactor + (this.endScaleFactor - this.startScaleFactor) * progress;

        // Update the size based on the new scale factor
        this.size = this.gameEnv.innerHeight / this.scaleFactor;
        this.width = this.size;
        this.height = this.size;

        // Call the parent update method to handle other updates
        super.update();

        // If the animation is complete, restart the bomb
        if (progress >= 1) {
            this.restart();
        }
    }

    draw() {
        // Call the parent draw method to handle drawing
        super.draw();
    }

    restart() {
        this.startTime = Date.now();
        this.position = { ...this.startPosition };
        this.scaleFactor = this.startScaleFactor;
    }
}

export default Bomb;