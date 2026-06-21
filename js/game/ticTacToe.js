// ticTacToe.js

const board = document.getElementById("board");
let cells = [];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations (indices)
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

function initBoard() {
    board.innerHTML = "";
    cells = [];
    currentPlayer = "X";
    gameActive = true;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    // Ignore if cell already filled or game over
    if (cell.textContent !== "" || !gameActive) {
        return;
    }

    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        setTimeout(() => alert(`${currentPlayer} wins!`), 10);
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        setTimeout(() => alert("It's a draw!"), 10);
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent !== "" &&
               cells[a].textContent === cells[b].textContent &&
               cells[a].textContent === cells[c].textContent;
    });
}

function checkDraw() {
    return cells.every(cell => cell.textContent !== "");
}

function resetGame() {
    initBoard();
}

// Start the game
initBoard();