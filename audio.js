// ====== AUDIO MANAGER ======
let audioUnlocked = false;
function unlockAudio() {
  if (!audioUnlocked) {
    audioUnlocked = true;
    audioManager.unmute();
    Object.values(audioManager.sounds).forEach(snd => {
      snd.play().then(() => snd.pause()).catch(()=>{});
    });
  }
}
window.addEventListener("click", unlockAudio, { once: true });
window.addEventListener("touchstart", unlockAudio, { once: true });

const audioManager = {
  bgMusic: document.getElementById("bg-music"),
  sounds: {
    correct: new Audio("item/correct-choice-43861.mp3"),
    wrong: new Audio("item/wrong-47985.mp3"),
    gameOver: new Audio("item/game-over.mp3"),
    victory: new Audio("item/victory.mp3"),
    turnChange: new Audio("item/switch-turn.mp3")
  },
  isMuted: false,
  init() {
    this.bgMusic.volume = 0.3;
    this.bgMusic.loop = true;
    Object.values(this.sounds).forEach(sound => sound.volume = 0.4);
    const savedVolume = localStorage.getItem("gameVolume");
    if (savedVolume !== null) this.updateVolume(parseFloat(savedVolume));
    document.getElementById("volume-slider").value = savedVolume || 0.5;
    const isMuted = localStorage.getItem("gameMuted") === "true";
    if (isMuted) this.mute();
    else this.unmute();
  },
  playSound(name) {
    if (!this.isMuted && this.sounds[name]) {
      this.sounds[name].currentTime = 0;
      this.sounds[name].play().catch(() => {});
    }
  },
  updateVolume(value) {
    this.bgMusic.volume = value;
    Object.values(this.sounds).forEach(sound => sound.volume = value);
    localStorage.setItem("gameVolume", value);
  },
  mute() {
    this.isMuted = true;
    this.bgMusic.pause();
    document.getElementById("toggle-music").textContent = "🔇";
    localStorage.setItem("gameMuted", "true");
  },
  unmute() {
    this.isMuted = false;
    this.bgMusic.play().catch(() => {});
    document.getElementById("toggle-music").textContent = "🔊";
    localStorage.setItem("gameMuted", "false");
  },
  toggleMusic() { this.isMuted ? this.unmute() : this.mute(); }
};
audioManager.init();