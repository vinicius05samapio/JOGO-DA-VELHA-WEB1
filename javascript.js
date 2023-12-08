let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';
let player1Wins = 0;
let player2Wins = 0;
let gameBoard = document.getElementById('game-board');
let cells = document.querySelectorAll('.cell');
let opponentType = 'friend';


function resetGame() {
    currentPlayer = 'X';
    cells.forEach(cell => cell.innerText = '');
}

function cellClick(cell) {
    if (cell.innerText === '' && !checkWinner()) {
        cell.innerText = currentPlayer;
        if (checkWinner()) {
            updateScore();
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (opponentType === 'computer' && currentPlayer === 'O') {
                setTimeout(computerMove, 500);
            }
        }
    }
}

function computerMove() {
    let emptyCells = Array.from(cells).filter(cell => cell.innerText === '');
    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let computerCell = emptyCells[randomIndex];
        cellClick(computerCell);
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].innerText !== '' &&
            cells[a].innerText === cells[b].innerText &&
            cells[a].innerText === cells[c].innerText) {
            return true;
        }
    }

    if (Array.from(cells).every(cell => cell.innerText !== '')) {
        resetGame();
    }

    return false;
}

function updateScore() {
    if (currentPlayer === 'X') {
        player1Wins++;
        document.getElementById('player1-wins').innerText = `Vitórias: ${player1Wins}`;
    } else {
        player2Wins++;
        document.getElementById('player2-wins').innerText = `Vitórias: ${player2Wins}`;
    }
}

document.getElementById('opponent').addEventListener('change', function() {
    opponentType = this.value;
    resetGame();
});

function cadastrarJogador1() {
    var nomejogador1 = document.getElementById("player1");
    var ronaldo = String(nomejogador1.value);
    document.getElementById('jogador1').innerHTML = ronaldo;
    document.getElementById("player1").style.display = 'none';
    document.getElementById("esconder").style.display = 'none';

   }

function cadastrarJogador2() {
    var nomejogador1 = document.getElementById("player2");
    var ronaldo = String(nomejogador1.value);
    document.getElementById('jogador2').innerHTML = ronaldo;
    document.getElementById("player2").style.display = 'none';
    document.getElementById("esconder").style.display = 'none';
   }

const btn = document.querySelector("#refresh")

btn.addEventListener('click', () => {
    location.reload()
})

function opponentChanged() {
    var opponentSelect = document.getElementById('opponent');
    var player2Input = document.getElementById('player2');

    if (opponentSelect.value === 'computer') {
        player2Input.value = 'Máquina';
        player2Input.setAttribute('readonly', true);
    } else {
        player2Input.value = '';
        player2Input.removeAttribute('readonly');
    }

    resetGame();
}