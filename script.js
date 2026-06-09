// ==========================================
// CONFIGURAÇÕES GERAIS
// ==========================================
const senhaCorreta = "amor2026";
const dataInicio = "2025-01-01T00:00:00"; // Altere para a data de vocês
const textoTituloPoema = "❤️ O Nosso Amor Além de Tudo ❤️";

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const contractScreen = document.getElementById('contract-screen');
const mainContent = document.getElementById('main-content');
const finalModal = document.getElementById('final-modal');
const body = document.body;

// ==========================================
// MÚSICA DE FUNDO
// ==========================================
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = "🎵 Tocar Música";
    } else {
        bgMusic.play();
        musicToggle.innerHTML = "🔇 Pausar Música";
    }
    isPlaying = !isPlaying;
});

// ==========================================
// ETAPA 1: LOGIN
// ==========================================
const btnLogin = document.getElementById('btn-login');
const passwordInput = document.getElementById('password-input');
const errorMsg = document.getElementById('login-error');

btnLogin.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });

function checkPassword() {
    if (passwordInput.value === senhaCorreta) {
        // Sucesso
        errorMsg.classList.add('hidden');
        loginScreen.style.opacity = '0';
        createHeartExplosion(window.innerWidth / 2, window.innerHeight / 2);
        
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            loginScreen.classList.remove('active');
            contractScreen.classList.remove('hidden');
            contractScreen.classList.add('active');
        }, 1000);
    } else {
        // Erro
        errorMsg.classList.remove('hidden');
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

// ==========================================
// ETAPA 2: CONTRATO DO AMOR
// ==========================================
const btnAceito = document.getElementById('btn-aceito');
const btnRecuso = document.getElementById('btn-recuso');

function moveButton() {
    const maxWidth = window.innerWidth - btnRecuso.clientWidth - 20;
    const maxHeight = window.innerHeight - btnRecuso.clientHeight - 20;
    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);
    
    btnRecuso.style.position = 'fixed';
    btnRecuso.style.left = randomX + 'px';
    btnRecuso.style.top = randomY + 'px';
}

btnRecuso.addEventListener('mouseover', moveButton);
btnRecuso.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(); });

btnAceito.addEventListener('click', () => {
    const rect = btnAceito.getBoundingClientRect();
    createHeartExplosion(rect.left + rect.width/2, rect.top + rect.height/2);
    
    contractScreen.style.opacity = '0';
    setTimeout(() => {
        contractScreen.classList.add('hidden');
        contractScreen.classList.remove('active');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('active');
        body.style.overflow = 'auto'; // Libera scroll
        typeWriter(); // Inicia efeito de digitação do poema
    }, 1000);
});

// ==========================================
// ETAPA 3: POEMA (Efeito de Digitação)
// ==========================================
const poemTitle = document.getElementById('poem-title');
let i = 0;

function typeWriter() {
    if (i < textoTituloPoema.length) {
        poemTitle.innerHTML += textoTituloPoema.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// ==========================================
// ETAPA 4: CONTADOR DO AMOR
// ==========================================
function updateCounter() {
    const start = new Date(dataInicio).getTime();
    const now = new Date().getTime();
    const diff = now - start;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}
setInterval(updateCounter, 1000);
updateCounter();

// ==========================================
// ETAPA 5: CARTA ANIMADA
// ==========================================
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
});

// ==========================================
// ETAPA 6: SURPRESA FINAL
// ==========================================
const btnSurprise = document.getElementById('btn-surprise');
const text1 = document.getElementById('final-text-1');
const text2 = document.getElementById('final-text-2');
const btnSim = document.getElementById('btn-sim');
const textEpic = document.getElementById('final-text-epic');

btnSurprise.addEventListener('click', () => {
    // Escurece tela e sobe música
    mainContent.style.opacity = '0';
    if(bgMusic.volume < 1) bgMusic.volume = 1;
    
    setTimeout(() => {
        mainContent.classList.add('hidden');
        finalModal.classList.remove('hidden');
        finalModal.classList.add('active');
        
        startFireworks();
        text1.classList.add('show');
        
        setTimeout(() => {
            text2.classList.add('show');
        }, 3000);
    }, 1000);
});

btnSim.addEventListener('click', () => {
    text1.classList.remove('show');
    text2.classList.remove('show');
    
    // Animação Épica
    createMassiveHeartRain();
    fireworksIntensity = 10; // Aumenta fogos
    
    setTimeout(() => {
        textEpic.classList.add('show');
    }, 1500);
});

// ==========================================
// EFEITOS VISUAIS (Corações e Fogos)
// ==========================================
const heartsContainer = document.getElementById('hearts-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = ['❤️', '💖', '💕', '💓'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 800); // Fundo contínuo

function createHeartExplosion(x, y) {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '100';
        heart.style.transition = 'all 1s ease-out';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 50; // Tendência para cima
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
            heart.style.opacity = '0';
        }, 10);
        setTimeout(() => heart.remove(), 1000);
    }
}

function createMassiveHeartRain() {
    setInterval(createHeart, 100);
}

// Canvas Fogos de Artifício Simplificado
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let particles = [];
let fireworksIntensity = 2; // 2% chance per frame

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1.0;
        this.decay = Math.random() * 0.02 + 0.01;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravidade
        this.life -= this.decay;
    }
    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function startFireworks() {
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if(Math.random() * 100 < fireworksIntensity) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.5; // Metade de cima
            const colors = ['#ff3366', '#ff9933', '#fff', '#D4AF37'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            for(let i=0; i<50; i++) particles.push(new Particle(x, y, color));
        }
        
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => { p.update(); p.draw(); });
        ctx.globalAlpha = 1.0;
    }
    animate();
}
