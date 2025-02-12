import { javaURI, fetchOptions } from "../api/config.js";

class Stats {
    constructor(personId) {
        this.personId = personId || 1; // personId can be set to cookie once fixed
        this.endpoints = {
            balance: `${javaURI}/rpg_answer/getBalance/${this.personId}`,
            chatScore: `${javaURI}/rpg_answer/getChatScore/${this.personId}`,
            questionsAnswered: `${javaURI}/rpg_answer/getQuestionsAnswered/${this.personId}`
        };
    }

    /**
     * Fetches and updates the game stats UI (Balance, Chat Score, Questions Answered).
     */
    fetchStats() {
        for (let [key, url] of Object.entries(this.endpoints)) {
            fetch(url, fetchOptions)
                .then(response => response.json())
                .then(data => {
                    document.getElementById(key).innerText = data ?? 0;
                })
                .catch(err => console.error(`Error fetching ${key}:`, err));
        }
    }
}

export default Stats;
