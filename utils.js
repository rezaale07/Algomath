// ====== UTIL ======
function showWarning(message) {
  const warning = document.createElement("div");
  warning.className = "warning-message";
  warning.textContent = message;
  document.body.appendChild(warning);
  setTimeout(() => warning.remove(), 2500);
}
function createConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.className = "confetti-container";
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDelay = Math.random() * 2.5 + "s";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confettiContainer.appendChild(confetti);
  }
  document.body.appendChild(confettiContainer);
  setTimeout(() => confettiContainer.remove(), 3500);
}
function showFeedback(isCorrect, correctAns) {
  dom.feedback.className = isCorrect ? "feedback-correct" : "feedback-wrong";
  dom.feedback.innerHTML = isCorrect
    ? `<div class="feedback-content correct"><span class="feedback-icon">✅</span> Benar! +10 poin</div>`
    : `<div class="feedback-content wrong"><span class="feedback-icon">❌</span> Salah! Jawaban benar: <b>${correctAns || ''}</b></div>`;
  dom.feedback.classList.add("feedback-animation");
  return new Promise(resolve =>
    setTimeout(() => {
      dom.feedback.classList.remove("feedback-animation");
      dom.feedback.innerHTML = "";
      dom.feedback.className = "";
      resolve();
    }, 1200)
  );
}

// ====== PROGRESS LOCALSTORAGE ======
function saveCompletedLevels() {
  localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
}
function initCompletedLevels() {
  const data = localStorage.getItem('completedLevels');
  completedLevels = data ? JSON.parse(data) : {};
}
function markLevelCompleted(category, level) {
  if (!completedLevels[category]) completedLevels[category] = {};
  completedLevels[category][level] = true;
  saveCompletedLevels();
}

// ====== BUTTON RIPPLE EFFECT ======
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function(event) {
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const rect = button.getBoundingClientRect();
      ripple.style.left = (event.clientX - rect.left) + "px";
      ripple.style.top = (event.clientY - rect.top) + "px";
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
});