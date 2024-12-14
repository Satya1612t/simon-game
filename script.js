const pads = document.querySelectorAll('.pad');
const startButton = document.getElementById("start");
const message = document.getElementById("message");
const highLightSound = new Audio('Sounds/highlight.mp3');
const gameEndSound = new Audio('Sounds/game-fail.mp3');

let sequence = [];
let playerIndex = 0;
let gameInProgress = false;
let gameStarted = false; 

function playHighLightSound() {
    highLightSound.play();
}

function flashPad(pad) {
    pad.style.opacity = 1;
    playHighLightSound();
    setTimeout(() => (pad.style.opacity = 0.5), 300);
}

function flashNewPad() {
    const newPad = document.getElementById(sequence[sequence.length - 1]);
    flashPad(newPad);
}

function getRandomColor() {
    const color = ['red', 'green', 'blue', 'yellow'];
    let randomIndx = Math.floor(Math.random() * color.length);
    return color[randomIndx];
}

function playSequence() {
    gameInProgress = true;
    flashNewPad(); 
    gameInProgress = false;
}

function nextRound() {
    playerIndex = 0;
    sequence.push(getRandomColor());
    message.textContent = `Round ${sequence.length}`;
    playSequence();
}

function handlePlayerInput(color) {
    if (!gameStarted) return; 

    if (!gameInProgress && color === sequence[playerIndex]) {
        const pad = document.getElementById(color);
        flashPad(pad);

        playerIndex++;
        if (playerIndex === sequence.length) {
            setTimeout(nextRound, 1000);
        }
    } else if (!gameInProgress) {
        startButton.style.display = 'block';
        message.textContent = "Game Over! Press Start to Play Again.";
        gameEndSound.play();
        sequence = [];
        gameStarted = false; 

        setTimeout(() => {
            message.textContent = "Press Start to Play";
        }, 3000);
    }
}

pads.forEach((pad) => {
    pad.addEventListener('click', () => handlePlayerInput(pad.id));
});

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    sequence = [];
    gameStarted = true; 
    nextRound();
});
