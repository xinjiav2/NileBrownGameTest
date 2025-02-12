import GameEnv from "./GameEnv.js";
import Character from "./Character.js";
import gameControlInstance from "./GameControl.js";
import MiniLevel from "./MiniLevel.js"; 

class Npc extends Character {
    constructor(data = null) {
        super(data);
        this.quiz = data?.quiz?.title; // Quiz title
        this.questions = this.shuffleArray(data?.quiz?.questions || []); // Shuffle questions
        this.currentQuestionIndex = 0;
        this.alertTimeout = null;
        this.bindInteractKeyListeners();
    }
    
    update() {
        this.draw();
    }
    
    bindInteractKeyListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    
    handleKeyDown({ key }) {
        if (key === 'e' || key === 'u') {
            this.handleKeyInteract();
        }
    }
    
    handleKeyUp({ key }) {
        if (key === 'e' || key === 'u') {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }
    
    handleKeyInteract() {
        const players = GameEnv.gameObjects.filter(
            obj => obj.state.collisionEvents.includes(this.spriteData.id)
        );
        const hasQuestions = this.questions.length > 0;
        if (players.length > 0 && hasQuestions) {
            players.forEach(player => {
                // Check if the current level is a mini-level
                if (gameControlInstance.currentLevel instanceof MiniLevel) {
                    // We are in a mini-level so complete it
                    gameControlInstance.currentLevel.complete();
                } else {
                    // Otherwise, start the mini-level
                    gameControlInstance.startMiniLevel(this);
                }
            });
        }
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export default Npc;
