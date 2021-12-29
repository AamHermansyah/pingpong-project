// Update Loop
import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

let lastTime;
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        // Update ball
        // ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

        // update computer paddle
        computerPaddle.update(delta, ball.y);

        // merubah warna background
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));

        document.documentElement.style.setProperty('--hue', hue + delta * 0.01);

        if (isLose()) handleLoose();
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLoose() {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
}

document.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

// mirip setInterval
window.requestAnimationFrame(update)