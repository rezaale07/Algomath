document.addEventListener("DOMContentLoaded", () => {
  initCompletedLevels();
  dom.startScreen.style.display = "block";
  dom.categorySelection.style.display = "none";
  dom.levelSelection.style.display = "none";
  dom.gameContainer.style.display = "none";
  dom.multiplayerSetup.style.display = "none";
  dom.multiplayerHud.style.display = "none";
});

// ====== MODE SELECTOR ======
document.getElementById("start-button").addEventListener("click", () => {
  gameMode = "single";
  playerName = document.getElementById("player-name").value.trim();
  playerClass = document.getElementById("player-class").value.trim();
  if (!playerName || !playerClass) return showWarning("Mohon isi nama dan kelas terlebih dahulu!");
  dom.startScreen.style.display = "none";
  dom.categorySelection.style.display = "block";
  document.getElementById("player-display-name").textContent = playerName;
});

document.getElementById("multiplayer-button").addEventListener("click", () => {
  gameMode = "multiplayer";
  dom.startScreen.style.display = "none";
  dom.multiplayerSetup.style.display = "block";
});

// ====== MUSIC CONTROLS ======
document.getElementById("toggle-music").addEventListener("click", () => audioManager.toggleMusic());
document.getElementById("volume-slider").addEventListener("input", e => audioManager.updateVolume(e.target.value));

// ====== KEMBALI KE MENU UTAMA (UNTUK KEDUA MODE) ======
window.backToMenu = function() {
  document.querySelectorAll(".game-complete").forEach(screen => screen.remove());
  dom.gameContainer.style.display = "none";
  dom.multiplayerHud.style.display = "none";
  dom.levelSelection.style.display = "none";
  dom.startScreen.style.display = "none";
  dom.categorySelection.style.display = "block";
  dom.feedback.textContent = "";
  dom.feedback.className = "";
  gameMode = "single";
  players = [];
  currentPlayerIndex = 0;
  currentQuestionIndex = 0;
};

// ====== PROGRESS DOT HANDLER ======
// Fungsi untuk update tampilan progress-dot pada level selection
function updateProgressDots(category) {
  const levels = ["Easy", "Medium", "Hard"];
  levels.forEach(level => {
    const dot = document.querySelector(`.progress-dot[data-level="${level}"]`);
    if (!dot) return;
    dot.classList.remove('active', 'dot-current', 'dot-locked');
    // Selesai
    if (completedLevels[category] && completedLevels[category][level]) {
      dot.classList.add('active');
    }
    // Saat ini (belum selesai)
    else if (level === currentLevel) {
      dot.classList.add('dot-current');
    }
    // Belum dicoba/locked
    else {
      dot.classList.add('dot-locked');
    }
  });
}

// Saat memilih kategori, tampilkan dan update progress dot
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    selectedCategory = btn.getAttribute('data-category');
    dom.categorySelection.style.display = "none";
    dom.levelSelection.style.display = "block";
    updateProgressDots(selectedCategory);
  });
});

// Saat memilih level, pastikan currentLevel di-set dan progress-dot diupdate
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    currentLevel = btn.getAttribute('data-level');
    updateProgressDots(selectedCategory);
    // ... lanjutkan logic start game singleplayer seperti biasa
  });
});