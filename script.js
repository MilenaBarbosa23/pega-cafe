const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const coffee = document.getElementById('coffee');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let isJumping = false;
let isGameOver = true;
let gameLoop;

// Função para pular
function jump() {
    if (isJumping || isGameOver) return;
    
    isJumping = true;
    player.classList.add('jump');
    
    setTimeout(() => {
        player.classList.remove('jump');
        isJumping = false;
    }, 500);
}

// Lógica de detecção de colisão e coleta
function checkPhysics() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    const coffeeRect = coffee.getBoundingClientRect();

    // Detecção de derrota (colisão com obstáculo)
    if (
        obstacleRect.left < playerRect.right &&
        obstacleRect.right > playerRect.left &&
        obstacleRect.top < playerRect.bottom &&
        obstacleRect.bottom > playerRect.top
    ) {
        gameOver();
    }

    // Detecção de pontuação (coletar café)
    if (
        coffeeRect.left < playerRect.right &&
        coffeeRect.right > playerRect.left &&
        coffeeRect.top < playerRect.bottom &&
        coffeeRect.bottom > playerRect.top
    ) {
        // Esconde o café temporariamente para não pontuar múltiplas vezes
        coffee.style.display = 'none';
        score += 1;
        scoreElement.innerText = score;
        
        // Reaparece o café quando a animação reiniciar (após sair da tela)
        setTimeout(() => {
            if (!isGameOver) coffee.style.display = 'block';
        }, 500);
    }
}

function startGame() {
    isGameOver = false;
    score = 0;
    scoreElement.innerText = score;
    
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    obstacle.style.display = 'block';
    coffee.style.display = 'block';
    
    obstacle.classList.add('move-obstacle');
    coffee.classList.add('move-coffee');

    gameLoop = setInterval(checkPhysics, 50);
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    
    obstacle.classList.remove('move-obstacle');
    coffee.classList.remove('move-coffee');
    
    obstacle.style.display = 'none';
    coffee.style.display = 'none';

    finalScoreElement.innerText = score;
    gameOverScreen.classList.remove('hidden');
}

// Eventos de interação
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        jump();
    }
});

// Suporte a clique ou toque na tela
document.addEventListener('mousedown', jump);
document.addEventListener('touchstart', jump);

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);