class CharacterSelection {
    constructor() {
      this.characters = {
        chillguy: 'Chill Guy',
        octopus:'Octopus',
        }
      };
    
  
    promptSelection() {
      let choice = prompt("Choose your character: Type 'octopus' or 'chillguy'").toLowerCase();
      while (!this.characters.hasOwnProperty(choice)) {
        choice = prompt("Invalid choice. Type 'octopus' or 'chillguy'").toLowerCase();
      }
      return choice;
    }
  }
  