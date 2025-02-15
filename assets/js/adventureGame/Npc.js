import Character from "./Character.js";
import gameControlInstance from "./GameControl.js";
import MiniLevel from "./MiniLevel.js"; 
import Prompt from "./Prompt.js"; // Import the Prompt class

class Npc extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.quiz = data?.quiz?.title; // Quiz title
        this.questions = this.shuffleArray(data?.quiz?.questions || []); // Shuffle questions
        this.currentQuestionIndex = 0;
        this.alertTimeout = null;
        this.prompt = new Prompt(); // Create a new Prompt instance
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
        const players = this.gameEnv.gameObjects.filter(
            obj => obj.state.collisionEvents.includes(this.spriteData.id)
        );
    }

    askNextQuestion() {
        if (this.currentQuestionIndex < this.questions.length) {
            // Prompt the next question
            const question = this.questions[this.currentQuestionIndex];
            const playerAnswer = prompt(question);
            this.checkAnswer(playerAnswer);
        } else {
            // Case 3: If all questions are finished in the mini level, move the player back to the main level
            this.completeQuiz();
        }
    }

    checkAnswer(answer) {
        // You can implement your answer checking logic here
        alert(`You answered: ${answer}`);
        this.currentQuestionIndex++;
        this.askNextQuestion(); // Proceed to the next question
    }

    completeQuiz() {
        alert("Congratulations! You completed the quiz.");
        // After finishing the mini-level, move to the next main level
        gameControlInstance.handleMiniLevelEnd();
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
