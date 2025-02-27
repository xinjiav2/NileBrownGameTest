// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';
import GameLevelWater from './GameLevelWater.js'; // Import the new game level

class GameLevelDesert {
  constructor(gameEnv) {
    // Values dependent on this.gameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_desert = path + "/images/gamify/desert2.jpg"; // be sure to include the path
    const image_data_desert = {
        name: 'desert',
        greeting: "Welcome to the desert! It is hot and dry here, but there are many enemies to be killed!",
        src: image_src_desert,
        pixels: {height: 580, width: 1038}
    };

    // Player data for Chillguy
    const sprite_src_chillguy = path + "/images/gamify/chillguy2.png"; // be sure to include the path
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
        id: 'Chill Guy',
        greeting: "Hi I am Chill Guy, the desert warrior. I am looking for wisdom and adventure!",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 50, // Adjusted for better movement
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 50, y: height - 100 }, // Adjusted initial position
        pixels: {height: 384, width: 512},
        orientation: {rows: 3, columns: 4 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 2, start: 0, columns: 3 },
        right: {row: 1, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    // NPC data for Tux 
    const sprite_src_tux = path + "/images/gamify/tux.png"; // be sure to include the path
    const sprite_greet_tux = [
      "I AM THE BOSS PENGUIN!!! I WILL TAKE CONTROL OF THIS DESERT AND MAKE IT SO THAT THIS DESERT WILL BECOME SNOW",
      "You cannot defeat me, I am the mighty Tux!",
      "Prepare yourself for a cold takeover!"
    ];
    const sprite_data_tux = {
        id: 'Tux',
        greeting: sprite_greet_tux,
        src: sprite_src_tux,
        SCALE_FACTOR: 8,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 352},
        INIT_POSITION: { x: width - 100, y: 50 }, // Position Tux at the end of the maze
        orientation: {rows: 8, columns: 11 },
        down: {row: 5, start: 0, columns: 3 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Linux command quiz
        quiz: { 
        title: "ZA LINUX COMMAND QUIZ",
          questions: [
            "Which command is used to list files in a directory?\n1. ls\n2. dir\n3. list\n4. show",
            "Which command is used to change directories?\n1. cd\n2. chdir\n3. changedir\n4. changedirectory",
            "Which command is used to create a new directory?\n1. mkdir\n2. newdir\n3. createdir\n4. makedir",
            "Which command is used to remove a file?\n1. rm\n2. remove\n3. delete\n4. erase",
            "Which command is used to remove a directory?\n1. rmdir\n2. removedir\n3. deletedir\n4. erasedir",
            "Which command is used to copy files?\n1. cp\n2. copy\n3. duplicate\n4. xerox",
            "Which command is used to move files?\n1. mv\n2. move\n3. transfer\n4. relocate",
            "Which command is used to view a file?\n1. cat\n2. view\n3. show\n4. display",
            "Which command is used to search for text in a file?\n1. grep\n2. search\n3. find\n4. locate",
            "Which command is used to view the contents of a file?\n1. less\n2. more\n3. view\n4. cat" 
          ] 
        },
        reaction: function() {
          const randomIndex = Math.floor(Math.random() * sprite_greet_tux.length);
          alert(sprite_greet_tux[randomIndex]);
        },
        interact: function() {
          let quiz = new Quiz(); // Create a new Quiz instance
          quiz.initialize();
          quiz.openPanel(sprite_data_tux.quiz);
          quiz.onComplete = function() {
            let primaryGame = gameEnv.gameControl;
            let levelArray = [GameLevelWater];
            let gameInGame = new GameControl(path, levelArray);
            primaryGame.pause();
            gameInGame.start();
            gameInGame.gameOver = function() {
              primaryGame.resume();
            }
          }
        }
    };

    // NPC data for Octocat
    const sprite_src_octocat = path + "/images/gamify/nahhur.png"; // be sure to include the path
    const sprite_greet_octocat = [
      "I AM NAAHUR! MY MASCOT ARMY WILL TAKE YOU OUT!",
      "YOU CANNOT ESCAPE THE WRATH OF NAHHUR'S ARMY!",
      "PREPARE TO BE CLONED INTO A GITHUB REPOSITORY!"
    ];
    const sprite_data_octocat = {
        id: 'Octocat',
        greeting: sprite_greet_octocat,
        src: sprite_src_octocat,
        SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 301, width: 801},
        INIT_POSITION: { x: (width / 4), y: (height / 4)},
        orientation: {rows: 1, columns: 4 },
        down: {row: 0, start: 0, columns: 3 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
        // GitHub command quiz 
        quiz: { 
          title: "ZA GITHUB COMMAND QUIZ",
          questions: [
            "Which command is used to clone a repository?\n1. git clone\n2. git fork\n3. git copy\n4. git download",
            "Which command is used to add changes to the staging area?\n1. git add\n2. git stage\n3. git commit\n4. git push",
            "Which command is used to commit changes?\n1. git commit\n2. git add\n3. git save\n4. git push",
            "Which command is used to push changes to a remote repository?\n1. git push\n2. git upload\n3. git send\n4. git commit",
            "Which command is used to pull changes from a remote repository?\n1. git pull\n2. git fetch\n3. git receive\n4. git update",
            "Which command is used to check the status of the working directory and staging area?\n1. git status\n2. git check\n3. git info\n4. git log",
            "Which command is used to create a new branch?\n1. git branch\n2. git create-branch\n3. git new-branch\n4. git checkout",
            "Which command is used to switch to a different branch?\n1. git checkout\n2. git switch\n3. git change-branch\n4. git branch",
            "Which command is used to merge branches?\n1. git merge\n2. git combine\n3. git join\n4. git integrate",
            "Which command is used to view the commit history?\n1. git log\n2. git history\n3. git commits\n4. git show"
          ] 
        },
        reaction: function() {
          const randomIndex = Math.floor(Math.random() * sprite_greet_octocat.length);
          alert(sprite_greet_octocat[randomIndex]);
        },
        interact: function() {
          let quiz = new Quiz(); // Create a new Quiz instance
          quiz.initialize();
          quiz.openPanel(sprite_data_octocat.quiz);
        }
    };

    // NPC data for Robot
    const sprite_src_robot = path + "/images/gamify/robot.png"; // be sure to include the path
    const sprite_greet_robot = [
      "YOUR LINUX SHELL TIME IS NOW MINE!! I WILL TAKE OVER THIS DESERT AND TURN IT INTO A LINUX FACTORY",
      "You cannot outsmart me, I am the ultimate Robot!",
      "Prepare to be automated!"
    ];
    const sprite_data_robot = {
        id: 'Robot',
        greeting: sprite_greet_robot,
        src: sprite_src_robot,
        SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 100,
        pixels: {height: 316, width: 627},
        INIT_POSITION: { x: (width * 3 / 4), y: (height * 1 / 4)},
        orientation: {rows: 3, columns: 6 },
        down: {row: 1, start: 0, columns: 6 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Jupyter Notebook command quiz
        quiz: { 
          title: "ZA JUPYTER NOTEBOOK QUIZ",
          questions: [
            "Which shortcut is used to run a cell in Jupyter Notebook?\n1. Shift + Enter\n2. Ctrl + Enter\n3. Alt + Enter\n4. Tab + Enter",
            "Which shortcut adds a new cell above the current cell?\n1. A\n2. B\n3. C\n4. D",
            "Which shortcut adds a new cell below the current cell?\n1. B\n2. A\n3. C\n4. D",
            "Which shortcut changes a cell to Markdown format?\n1. M\n2. Y\n3. R\n4. K",
            "Which shortcut changes a cell to Code format?\n1. Y\n2. M\n3. C\n4. D",
            "Which shortcut deletes the current cell?\n1. D, D\n2. X\n3. Del\n4. Ctrl + D",
            "Which shortcut saves the current notebook?\n1. Ctrl + S\n2. Alt + S\n3. Shift + S\n4. Tab + S",
            "Which shortcut restarts the kernel?\n1. 0, 0\n2. R, R\n3. K, K\n4. Shift + R",
            "Which shortcut interrupts the kernel?\n1. I, I\n2. Ctrl + C\n3. Shift + I\n4. Alt + I",
            "Which shortcut toggles line numbers in a cell?\n1. L\n2. N\n3. T\n4. G"
          ] 
        },
        reaction: function() {
          const randomIndex = Math.floor(Math.random() * sprite_greet_robot.length);
          alert(sprite_greet_robot[randomIndex]);
        },
        interact: function() {
          let quiz = new Quiz(); // Create a new Quiz instance
          quiz.initialize();
          quiz.openPanel(sprite_data_robot.quiz);
        }
    };

    // NPC data for R2D2
    const sprite_src_r2d2 = path + "/images/gamify/r2_idle.png"; // be sure to include the path
    const sprite_greet_r2d2 = [
      "Hi I am R2D2. Everyone here is crazy, come to Hoth with me and escape this dystopia!",
      "Beep boop! Let's get out of here!",
      "Join me on an adventure to Hoth!"
    ];
    const sprite_data_r2d2 = {
        id: 'StarWarsR2D2',
        greeting: sprite_greet_r2d2,
        src: sprite_src_r2d2,
        SCALE_FACTOR: 8,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 100,
        pixels: {width: 505, height: 223},
        INIT_POSITION: { x: (width * 1 / 4), y: (height * 3 / 4)}, // Adjusted position
        orientation: {rows: 1, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        reaction: function() {
          const randomIndex = Math.floor(Math.random() * sprite_greet_r2d2.length);
          alert(sprite_greet_r2d2[randomIndex]);
        },
        interact: function() {
          // Set a primary game reference from the game environment
          let primaryGame = gameEnv.gameControl;
          // Define the game in game level
          let levelArray = [GameLevelStarWars];
          // Define a new GameControl instance with the StarWars level
          let gameInGame = new GameControl(path, levelArray);
          // Pause the primary game 
          primaryGame.pause();
          // Start the game in game
          gameInGame.start();
          // Setup "callback" function to allow transition from game in game to the underlying game
          gameInGame.gameOver = function() {
            // Call .resume on primary game
            primaryGame.resume();
          }
        }
    };

    // List of objects definitions for this level
    this.classes = [
      { class: Background, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_tux },
      { class: Npc, data: sprite_data_octocat },
      { class: Npc, data: sprite_data_robot },
      { class: Npc, data: sprite_data_r2d2 },
    ];

    // Show the backstory text box
    this.showBackstory();
  }

  // Method to show the backstory text box
  showBackstory() {
    const backstoryText = "Mutant mascots have taken over this desktop to force laborers to learn their code. You must answer questions to fight them!";
    const backstoryDiv = document.createElement('div');
    backstoryDiv.style.position = 'absolute';
    backstoryDiv.style.top = '50%';
    backstoryDiv.style.left = '50%';
    backstoryDiv.style.transform = 'translate(-50%, -50%)';
    backstoryDiv.style.padding = '20px';
    backstoryDiv.style.backgroundColor = 'black';
    backstoryDiv.style.border = '2px solid black';
    backstoryDiv.style.zIndex = '1000';
    backstoryDiv.innerHTML = `<p>${backstoryText}</p><button id="startGameButton">Start Game</button>`;
    document.body.appendChild(backstoryDiv);

    document.getElementById('startGameButton').addEventListener('click', () => {
      document.body.removeChild(backstoryDiv);
      this.startGame();
    });
  }

  // Method to start the game
  startGame() {
    // Initialize game objects and start the game
    this.classes.forEach(obj => {
      const instance = new obj.class(obj.data);
      instance.initialize();
    });
  }
}

export default GameLevelDesert;