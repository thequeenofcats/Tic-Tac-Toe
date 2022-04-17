const cellElements = document.querySelectorAll('#cell');
const grid = document.querySelector('.grid-div');
const choosePlayers = document.querySelector('.choose-players');
const startGameButton = document.querySelector('.start');
const inputNameOne = document.querySelector('#name1');
const inputNameTwo = document.querySelector('#name2');
const endScreenElements = document.querySelector('.end-screen');
const playAgainButton = document.querySelector('.play-again');
const endTextElement = document.querySelector('.end-text')
const playerOneName = inputNameOne.value;
const playerTwoName = inputNameTwo.value;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const board =[ [0, 1, 2, 3, 4, 5, 6, 7, 8]];

const signX = 'X';
const signO = 'O';
let circleTurn;
let currentMark = 'X';
let player1 = startGame.player1;
let player2 = startGame.player2;
const fullBox = 'full';

function makePlayer(player, mark) {
    currentMark = mark;
    return { player, mark }
}


function startGame() {
    grid.style.display = 'flex';
    choosePlayers.style.display = 'none';
    let playerOneName = inputNameOne.value;
    let playerTwoName = inputNameTwo.value;
    player2 = makePlayer(`${playerTwoName}`, signO);
    player1 = makePlayer(`${playerOneName}`, signX);
}

function addMark(e) {
    const box = e.target;
    const playerOneName = inputNameOne.value;
    const playerTwoName = inputNameTwo.value;
    const currentMark = circleTurn ? signO : signX;
    box.innerText = `${currentMark}`;
    box.classList.add(`${currentMark}`);
    box.classList.add(fullBox);
    
    if(checkGame(signO)) {
        endTextElement.innerText = `Congratulations ${playerTwoName}, you won!`;
        endScreenElements.style.display = 'flex';
        grid.style.display = 'none';
    } else if (checkGame(signX)) {
        endTextElement.innerText = `Congratulations ${playerOneName}, you won!`;
        endScreenElements.style.display = 'flex';
        grid.style.display = 'none';
    } else if (checkDraw(fullBox)) {
        endTextElement.innerText = `It's a draw!`;
        endScreenElements.style.display = 'flex';
        grid.style.display = 'none';
    } else {
        circleTurn = !circleTurn
    }
}

function checkGame(currentMark) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentMark)
        })
    })
}

function checkDraw(fullBox) {
    return WINNING_COMBINATIONS.every(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(fullBox)
        })
    })
}

function removeClasses() {
    choosePlayers.style.display = 'flex';
    endScreenElements.style.display = 'none';
    cellElements.forEach(cell => {
        cell.className = 'cell';
        cell.innerText = '';
    cellElements.forEach(cell => cell.removeEventListener('click', addMark, {once: true}))
    cellElements.forEach(cell => cell.addEventListener('click', addMark, {once: true}))
    })
}


cellElements.forEach(cell => cell.addEventListener('click', addMark, {once: true}))
startGameButton.addEventListener('click', startGame)
playAgainButton.addEventListener('click', removeClasses)