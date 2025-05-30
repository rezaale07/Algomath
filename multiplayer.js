// ====== RESPONSIVE PLAYER INPUTS (MULTIPLAYER) ======
function updatePlayerInputs(count) {
  dom.playerNames.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const playerCard = document.createElement("div");
    playerCard.className = "player-card";
    playerCard.innerHTML = `<h4>Pemain ${i + 1}</h4>
    <input type="text" class="player-input" placeholder="Masukkan nama pemain ${i + 1}" required>`;
    dom.playerNames.appendChild(playerCard);
  }
}
document.addEventListener("DOMContentLoaded", () => updatePlayerInputs(2));

// ====== INCREMENT/DECREMENT PLAYER ======
document.getElementById("player-inc").addEventListener("click", () => {
  let count = parseInt(dom.playerCount.textContent);
  if (count < 4) {
    dom.playerCount.textContent = count + 1;
    updatePlayerInputs(count + 1);
  }
});
document.getElementById("player-dec").addEventListener("click", () => {
  let count = parseInt(dom.playerCount.textContent);
  if (count > 2) {
    dom.playerCount.textContent = count - 1;
    updatePlayerInputs(count - 1);
  }
});

// ====== MULTIPLAYER DIFFICULTY ======
document.querySelectorAll(".diff-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
  });
});

// ====== MULTIPLAYER MULAI ======
document.getElementById("start-multiplayer-btn").addEventListener("click", startMultiplayerGame);
function startMultiplayerGame() {
  const difficultyBtn = document.querySelector(".diff-btn.active");
  if (!difficultyBtn) return showWarning("Pilih tingkat kesulitan terlebih dahulu!");
  multiplayerLevel = difficultyBtn.dataset.difficulty;
  multiplayerCategory = document.getElementById("multiplayer-category").value;
  let playerInputs = dom.playerNames.querySelectorAll(".player-input");
  let tempPlayers = [];
  let allValid = true;
  playerInputs.forEach((input, i) => {
    const name = input.value.trim();
    if (!name) {
      input.classList.add("error");
      allValid = false;
    } else {
      input.classList.remove("error");
      tempPlayers.push({ name, score: 0, lives: gameConfig.multiplayer[multiplayerLevel].lives, questionsAnswered: 0 });
    }
  });
  if (!allValid) return showWarning("Semua pemain harus memiliki nama!");
  gameMode = "multiplayer";
  players = tempPlayers;
  currentPlayerIndex = 0;
  multiplayerQuestions = questionsData.multiplayer[multiplayerCategory][multiplayerLevel];
  dom.multiplayerSetup.style.display = "none";
  dom.multiplayerHud.style.display = "flex";
  dom.gameContainer.style.display = "block";
  currentQuestionIndex = 0;
  showMultiplayerQuestion();
}

function showMultiplayerQuestion() {
  if (!multiplayerQuestions || currentQuestionIndex >= multiplayerQuestions.length) return endMultiplayerGame();
  const curQ = multiplayerQuestions[currentQuestionIndex];
  const curPlayer = players[currentPlayerIndex];
  dom.questionText.innerHTML = `<div class="current-player">Giliran: <b>${curPlayer.name}</b></div>
    <div class="question-text">${curQ.question}</div>`;
  dom.answerButtons.innerHTML = "";
  curQ.answers.forEach((ans, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = ans;
    btn.onclick = () => checkMultiplayerAnswer(idx);
    dom.answerButtons.appendChild(btn);
  });
  updateMultiplayerHUD();
  if (multiplayerLevel !== "easy") startMultiplayerTimer();
}

function checkMultiplayerAnswer(idx) {
  clearInterval(timer);
  const curQ = multiplayerQuestions[currentQuestionIndex];
  const curPlayer = players[currentPlayerIndex];
  dom.answerButtons.querySelectorAll("button").forEach(b => b.disabled = true);
  const isCorrect = idx === curQ.correct;
  if (isCorrect) { curPlayer.score += 10; curPlayer.questionsAnswered++; audioManager.playSound("correct"); }
  else { curPlayer.lives--; audioManager.playSound("wrong"); }
  showFeedback(isCorrect, curQ.answers[curQ.correct]).then(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= multiplayerQuestions.length || players.every(p => p.lives <= 0)) endMultiplayerGame();
    else { switchPlayerMultiplayer(); }
  });
}

function startMultiplayerTimer() {
  clearInterval(timer);
  timeLeft = gameConfig.multiplayer[multiplayerLevel].timeLimit;
  dom.timerText.textContent = `⏱️ ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    dom.timerText.textContent = `⏱️ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      players[currentPlayerIndex].lives--;
      showFeedback(false, multiplayerQuestions[currentQuestionIndex].answers[multiplayerQuestions[currentQuestionIndex].correct]).then(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex >= multiplayerQuestions.length || players.every(p => p.lives <= 0)) endMultiplayerGame();
        else { switchPlayerMultiplayer(); }
      });
    }
  }, 1000);
}

function switchPlayerMultiplayer() {
  let tries = 0, found = false;
  let totalPlayers = players.length;
  while (!found && tries < totalPlayers) {
    currentPlayerIndex = (currentPlayerIndex + 1) % totalPlayers;
    if (players[currentPlayerIndex].lives > 0) found = true;
    tries++;
  }
  setTimeout(() => showMultiplayerQuestion(), 800);
}

function updateMultiplayerHUD() {
  dom.multiplayerHud.innerHTML = players.map((p, i) =>
    `<div class="player-stats-card${i === currentPlayerIndex ? " active" : ""}">
      <h3>${p.name} ${i === currentPlayerIndex ? "(Bermain)" : ""}</h3>
      <p>Skor: ${p.score}</p>
      <p>Nyawa: ${"❤️".repeat(p.lives)}</p>
    </div>`
  ).join("") +
  `<div class="game-progress">
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${(currentQuestionIndex / multiplayerQuestions.length) * 100}%"></div>
    </div>
    <span>Soal ${currentQuestionIndex + 1}/${multiplayerQuestions.length}</span>
  </div>`;
}

function endMultiplayerGame() {
  clearInterval(timer);
  const winner = players.reduce((prev, cur) => cur.score > prev.score ? cur : prev);
  const ranking = players.slice().sort((a,b) => b.score - a.score);
  const gameComplete = document.createElement("div");
  gameComplete.className = "game-complete multiplayer";
  gameComplete.innerHTML = `
    <div class="complete-content">
      <h2>🏆 Permainan Selesai! 🏆</h2>
      <div class="winner-announcement">
        <h3>${winner.name} Menang!</h3>
        <p>Skor: ${winner.score}</p>
      </div>
      <div class="final-rankings">
        ${ranking.map((p,i) => `
          <div class="player-result${p === winner ? " winner" : ""}">
            <h4>${i+1}. ${p.name}</h4>
            <p>Skor: ${p.score}</p>
            <p>Jawaban Benar: ${p.questionsAnswered}</p>
            <p>Nyawa: ${"❤️".repeat(p.lives)}</p>
          </div>
        `).join("")}
      </div>
      <div class="action-buttons">
        <button onclick="location.reload()" class="retry-btn">Main Lagi</button>
      </div>
    </div>
  `;
  document.body.appendChild(gameComplete);
  dom.gameContainer.style.display = "none";
  if (winner.score >= 30) createConfetti(), audioManager.playSound("victory");
  else audioManager.playSound("gameOver");
}