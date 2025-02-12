import GameEnv from "./GameEnv.js";
import Character from "./Character.js";
import gameControlInstance from "./GameControl.js";
import MiniLevel from "./MiniLevel.js";
import Prompt from "./Prompt.js";
import npcTrackerInstance from "./NpcTracker.js"; // Import NPC Tracker

class Npc extends Character {
    constructor(data = null) {
        super(data);
        this.quiz = data?.quiz?.title; // Quiz title
        this.questions = this.shuffleArray(data?.quiz?.questions || []); // Shuffle questions
        this.currentQuestionIndex = 0;
        this.alertTimeout = null;
        this.prompt = new Prompt();
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

        if (players.length > 0) {
            npcTrackerInstance.addNpc(this.spriteData.id); // Track NPC

            if (!(gameControlInstance.currentLevel instanceof MiniLevel)) {
                if (hasQuestions) {
                    gameControlInstance.startMiniLevel(this);
                }
            } else if (gameControlInstance.currentLevel instanceof MiniLevel) {
                this.prompt.openPromptPanel(this);
            }
        }
    }

    askNextQuestion() {
        if (this.currentQuestionIndex < this.questions.length) {
            const question = this.questions[this.currentQuestionIndex];
            const playerAnswer = prompt(question);
            this.checkAnswer(playerAnswer);
        } else {
            this.completeQuiz();
        }
    }

    checkAnswer(answer) {
        alert(`You answered: ${answer}`);
        this.currentQuestionIndex++;
        this.askNextQuestion();
    }

    completeQuiz() {
        alert("Congratulations! You completed the quiz.");
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
