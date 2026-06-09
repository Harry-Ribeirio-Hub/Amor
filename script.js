const senhaCorreta = "amor2026";
const dataInicio = "2026-04-20T00:00:00";

const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    isPlaying ? bgMusic.pause() : bgMusic.play();
    isPlaying = !isPlaying;
    musicToggle.innerText = isPlaying ? "🔇 Pausar" : "🎵 Tocar";
});

document.getElementById('btn-login').addEventListener('click', () => {
    if (document.getElementById('password-input').value === senhaCorreta) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('contract-screen').classList.remove('hidden');
    }
});

document.getElementById('btn-aceito').addEventListener('click', () => {
    document.getElementById('contract-screen').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
});

document.getElementById('btn-recuso').addEventListener('mouseover', function() {
    this.style.position = 'fixed';
    this.style.top = Math.random() * 80 + 'vh';
    this.style.left = Math.random() * 80 + 'vw';
});

function updateCounter() {
    const diff = new Date() - new Date(dataInicio);
    document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
}
setInterval(updateCounter, 1000);
updateCounter();

document.getElementById('envelope').addEventListener('click', function() { this.classList.toggle('open'); });

document.getElementById('btn-surprise').addEventListener('click', () => {
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('final-modal').classList.remove('hidden');
    document.getElementById('final-text-1').classList.add('show');
    setTimeout(() => document.getElementById('final-text-2').classList.add('show'), 2000);
});
