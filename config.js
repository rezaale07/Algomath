// ====== KONFIGURASI GAME ======
const gameConfig = {
    single: {
      Easy: { timeLimit: 60, lives: 3, minScore: 60, questionsPerLevel: 10 },
      Medium: { timeLimit: 45, lives: 2, minScore: 60, questionsPerLevel: 10 },
      Hard: { timeLimit: 30, lives: 1, minScore: 60, questionsPerLevel: 10 }
    },
    multiplayer: {
      easy: { timeLimit: 30, lives: 3, questionsPerGame: 5 },
      medium: { timeLimit: 25, lives: 3, questionsPerGame: 5 },
      hard: { timeLimit: 20, lives: 3, questionsPerGame: 5 }
    }
  };
  
  // ====== VARIABEL GLOBAL ======
  let gameMode = "single";
  let playerName = "", playerClass = "", selectedCategory = "", currentLevel = "";
  let lockedCategory = "", currentQuestionIndex = 0, currentScore = 0, lives = 3, timeLeft = 30, timer;
  let players = [], currentPlayerIndex = 0, multiplayerCategory = "", multiplayerLevel = "";
  let multiplayerQuestions = [];
  let isQuizStarted = false;
  let completedLevels = {};
  let singleScore = 0;
  let singleLives = 3;
  let singleTimeLeft = 60;
  let singleCurrentIdx = 0;