// Create floating particles
for(let i = 0; i < 50; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
  particle.style.animationDelay = Math.random() * 5 + 's';
  document.body.appendChild(particle);
}

// Variables
const pages = document.querySelectorAll('.page');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('musicToggle');
let musicPlaying = false;

// Set volume
if (music) {
  music.volume = 0.25;
}

// Function to go to page
function goToPage(n) {
  pages.forEach(p => p.classList.remove('active'));
  setTimeout(() => {
    document.getElementById(`page${n}`).classList.add('active');
  }, 100);
}

// Function to start experience
function startExperience() {
  playMusic();
  goToPage(2);
}

// Function to finish
function finish() {
  const messages = [
    "🎉 Terima kasih sudah mengunjungi portofolio saya!",
    "✨ Sampai jumpa lagi!",
    "🚀 Mari berkolaborasi bersama!"
  ];
  alert(messages[Math.floor(Math.random() * messages.length)]);
  goToPage(1);
}

// Function to play music
function playMusic() {
  if (music && !musicPlaying) {
    music.play().then(() => {
      musicPlaying = true;
      musicToggle.classList.add('playing');
      musicToggle.textContent = '🎵';
    }).catch(err => {
      console.log('Musik memerlukan interaksi user:', err);
    });
  }
}

// Function to toggle music
function toggleMusic() {
  if (!music) return;
  
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicToggle.classList.remove('playing');
    musicToggle.textContent = '🔇';
  } else {
    music.play().then(() => {
      musicPlaying = true;
      musicToggle.classList.add('playing');
      musicToggle.textContent = '🎵';
    }).catch(err => {
      console.log('Tidak dapat memutar musik:', err);
    });
  }
}

// Music toggle click event
musicToggle.addEventListener('click', toggleMusic);

// Auto play on first interaction
let firstInteraction = true;
document.addEventListener('click', function autoPlay() {
  if (firstInteraction) {
    playMusic();
    firstInteraction = false;
  }
}, { once: true });

// Prevent page reload on button click
window.addEventListener('beforeunload', () => {
  if (music) music.pause();
});