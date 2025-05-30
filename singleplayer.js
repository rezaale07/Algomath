function initCompletedLevels() {
  completedLevels = {};
  Object.keys(questionsData.single).forEach(kat => {
    completedLevels[kat] = { Easy: false, Medium: false, Hard: false };
  });
}

// === Tambahkan fungsi ini untuk update progress-dot ===
function updateProgressDots() {
  const dots = dom.levelSelection.querySelectorAll(".progress-dot");
  dots.forEach(dot => {
    const level = dot.getAttribute("data-level");
    dot.classList.remove("active", "dot-current", "dot-locked");
    if (completedLevels[selectedCategory][level]) {
      dot.classList.add("active");
    } else if (
      (level === "Easy") ||
      (level === "Medium" && completedLevels[selectedCategory].Easy) ||
      (level === "Hard" && completedLevels[selectedCategory].Medium)
    ) {
      dot.classList.add("dot-current");
    } else {
      dot.classList.add("dot-locked");
    }
  });
}

document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.getAttribute("data-category");
    dom.categorySelection.style.display = "none";
    dom.levelSelection.style.display = "block";
    document.getElementById("level-title").textContent = `Pilih Level ${selectedCategory}`;
    updateLevelButtons();
    updateProgressDots(); // === PANGGIL DI SINI ===
  });
});

function updateLevelButtons() {
  dom.levelSelection.querySelectorAll(".level-btn").forEach(btn => {
    const level = btn.getAttribute("data-level");
    if (level === "Easy") btn.disabled = false;
    else if (level === "Medium") btn.disabled = !completedLevels[selectedCategory].Easy;
    else if (level === "Hard") btn.disabled = !completedLevels[selectedCategory].Medium;
    btn.style.opacity = btn.disabled ? "0.5" : "1";
  });
}
dom.levelSelection.querySelectorAll(".level-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!btn.disabled) {
      currentLevel = btn.getAttribute("data-level");
      startSingleGame();
      updateProgressDots(); // === OPTIONAL, untuk highlight saat main level tertentu
    }
  });
});
function startSingleGame() {
  gameMode = "single";
  dom.levelSelection.style.display = "none";
  dom.gameContainer.style.display = "block";
  dom.multiplayerHud.style.display = "none";
  singleCurrentIdx = 0;
  singleScore = 0;
  singleLives = gameConfig.single[currentLevel].lives;
  singleTimeLeft = gameConfig.single[currentLevel].timeLimit;
  showSingleQuestion();
}
function showSingleQuestion() {
  const questionList = questionsData.single[selectedCategory][currentLevel];
  if (singleCurrentIdx >= questionList.length) {
    return endSingleGame(true);
  }
  const curQ = questionList[singleCurrentIdx];
  dom.questionText.innerHTML = curQ.question;
  dom.answerButtons.innerHTML = "";
  curQ.answers.forEach((ans, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = ans;
    btn.onclick = () => handleSingleAnswer(idx);
    dom.answerButtons.appendChild(btn);
  });
  updateSingleHUD();
  if (currentLevel !== "Easy") startSingleTimer();
}
function handleSingleAnswer(idx) {
  clearInterval(timer);
  const questionList = questionsData.single[selectedCategory][currentLevel];
  const curQ = questionList[singleCurrentIdx];
  dom.answerButtons.querySelectorAll("button").forEach(b => b.disabled = true);
  const isCorrect = idx === curQ.correct;
  if (isCorrect) { singleScore += 10; audioManager.playSound("correct"); }
  else { singleLives--; audioManager.playSound("wrong"); }
  showFeedback(isCorrect, curQ.answers[curQ.correct]).then(() => {
    singleCurrentIdx++;
    if (singleLives <= 0) endSingleGame(false);
    else if (singleCurrentIdx >= questionList.length) endSingleGame(true);
    else showSingleQuestion();
  });
}
function startSingleTimer() {
  singleTimeLeft = gameConfig.single[currentLevel].timeLimit;
  dom.timerText.textContent = `⏱️ ${singleTimeLeft}s`;
  timer = setInterval(() => {
    singleTimeLeft--;
    dom.timerText.textContent = `⏱️ ${singleTimeLeft}s`;
    if (singleTimeLeft <= 0) {
      clearInterval(timer);
      singleLives--;
      showFeedback(false).then(() => {
        singleCurrentIdx++;
        if (singleLives <= 0) endSingleGame(false);
        else if (singleCurrentIdx >= questionsData.single[selectedCategory][currentLevel].length) endSingleGame(true);
        else showSingleQuestion();
      });
    }
  }, 1000);
}
function updateSingleHUD() {
  dom.scoreText.textContent = `Skor: ${singleScore}`;
  dom.livesText.innerHTML = "❤️".repeat(singleLives);
  dom.timerText.textContent = currentLevel === "Easy" ? "" : `⏱️ ${singleTimeLeft}s`;
}
function endSingleGame(success) {
  clearInterval(timer);
  dom.gameContainer.style.display = "none";
  const passed = singleScore >= gameConfig.single[currentLevel].minScore;
  completedLevels[selectedCategory][currentLevel] = success && passed;
  updateProgressDots(); // === TAMBAHKAN DI SINI, setelah selesai level
  const gameComplete = document.createElement("div");
  gameComplete.className = "game-complete";
  gameComplete.innerHTML = `
    <div class="complete-content">
      <h2>${success ? "🎉 Level Selesai! 🎉" : "Game Over"}</h2>
      <div class="final-stats">
        <h3>${selectedCategory} - Level ${currentLevel}</h3>
        <div class="score-breakdown">
          <p><span class="stat-label">Skor Akhir:</span> <span class="stat-value">${singleScore}/100</span></p>
          <p><span class="stat-label">Soal Dijawab:</span> <span class="stat-value">${singleCurrentIdx}/${questionsData.single[selectedCategory][currentLevel].length}</span></p>
          <p><span class="stat-label">Status:</span> <span class="stat-value ${passed ? "pass" : "fail"}">${passed ? "Lulus! 🌟" : "Belum Lulus ⚠️"}</span></p>
        </div>
      </div>
      <div class="action-buttons">
        <button onclick="retrySingleLevel()" class="retry-btn">🔄 Coba Lagi</button>
        ${passed && currentLevel !== "Hard" ? `<button onclick="nextSingleLevel()" class="next-btn">➡️ Level Selanjutnya</button>` : ""}
        <button onclick="backToMenu()" class="menu-btn">🏠 Menu Utama</button>
      </div>
    </div>
  `;
  document.body.appendChild(gameComplete);
  if (success && passed) createConfetti();
  audioManager.playSound(success && passed ? "victory" : "gameOver");
}
window.retrySingleLevel = function() {
  document.querySelector(".game-complete")?.remove();
  startSingleGame();
};
window.nextSingleLevel = function() {
  document.querySelector(".game-complete")?.remove();
  const levels = ["Easy", "Medium", "Hard"];
  const idx = levels.indexOf(currentLevel);
  if (idx < levels.length - 1) {
    currentLevel = levels[idx + 1];
    startSingleGame();
  }
};