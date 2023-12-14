const board = document.getElementById('board');
const time = document.getElementById('time');
const val = document.getElementById('val');
const score = document.getElementById('score');
let username1 = 'Player 1';
let username2 = 'Player 2';
let usernameRound;
const turn = document.getElementById('turn')

let boardArray = [];
let player = 0;
let player1Score = 0;
let player2Score = 0;
let clicked = false;

let player1ScoreText = document.createElement('div');
player1ScoreText.textContent = player1Score + ':';

let player2ScoreText = document.createElement('div');
player2ScoreText.textContent = player2Score;


let heightInput = document.createElement('input');
heightInput.type = 'number';
heightInput.value = 5; // Set the default value

let widthInput = document.createElement('input');
widthInput.type = 'number';
widthInput.value = 5; // Set the default value

let reset = document.createElement('button');
reset.textContent = 'Reset';
reset.addEventListener('click', function () {
    window.location.reload();
});

let newGame = document.createElement('button');
newGame.textContent = 'New';
newGame.addEventListener('click', function () {
    username1 = document.getElementById('username_1').value
    username2 = document.getElementById('username_2').value
    document.getElementById('username_1').style.display = 'none'
    document.getElementById('username_2').style.display = 'none'
    let height = parseInt(heightInput.value);
    let width = parseInt(widthInput.value);
    main(height, width);
    board.style.display = 'flex'
});

val.appendChild(heightInput);
val.appendChild(widthInput);
val.appendChild(reset);
val.appendChild(newGame);
val.style.display = 'flex'
val.style.justifyContent = 'space-between'
score.appendChild(player1ScoreText)
score.appendChild(player2ScoreText)

function main(height, width) {
    if (isNaN(height) || isNaN(width) || height <= 0 || width <= 0) {
        alert('Please enter valid positive numbers for height and width.');
        window.location.reload();
    }
    if (!usernameRound) {
        checkPlayer(); // Assign a random player for the initial turn
    }
    boardCreation(height, width);
    if (!clicked) {
        timer(time);
    }
    clicked = true
}

function boardCreation(height, width) {
    let html = "<table>";
    for (let i = 0; i < height; i++) {
        boardArray[i] = [];
        html += "<tr>";
        for (let j = 0; j < width; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('onclick', `changeColor(${j})`);
            cell.classList.add('normal');
            html += cell.outerHTML;
            boardArray[i][j] = cell; // update boardArray with the cell element
        }
        html += '</tr>';
    }
    html += "</table>";
    board.innerHTML = html;
    board.style.height = height * 66 + 'px';
    board.style.width = width * 66 + 'px';
    console.log(usernameRound)
    console.log(username1)
    console.log(username2)
    turn.innerHTML = `<p>It's ${usernameRound}'s turn.</p>`
}

function changeColor(y) {
    let currentPlayer = checkPlayer();
    let col;

    for (col = boardArray.length - 1; col >= 0; col--) {
        let cell = boardArray[col][y];
        if (!cell.classList.contains('yellow') && !cell.classList.contains('red')) {
            if (currentPlayer === 1) {
                cell.classList.remove('normal');
                cell.classList.add('yellow');
                break;
            } else if (currentPlayer === 2) {
                cell.classList.remove('normal');
                cell.classList.add('red');
                break;
            }
        }
    }
    updateBoard();
    let won = checkWin(col, y)
    let isDraw = draw(boardArray);
    if (won) {
        checkPlayer()
        alert(`Congratulations! ${usernameRound} wins!`)
        updateScore(currentPlayer);
        resetGame();

    } else if (isDraw) {
        alert("It's a Draw!");
        player1Score += 1
        player2Score += 1
    }
}
function updateScore(player) {
    if (player === 1) {
        player1Score += 1;
        player1ScoreText.textContent = player1Score + ':';
    } else if (player === 2) {
        player2Score += 1;
        player2ScoreText.textContent = player2Score;
    }
}

function updateBoard() {
    cells = []
    board.innerHTML = "";

    let html = "<table>";

    for (let i = 0; i < boardArray.length; i++) {
        cells[i] = []
        html += "<tr>";
        for (let j = 0; j < boardArray[i].length; j++) {
            let cell = boardArray[i][j];
            cell.setAttribute('onclick', `changeColor(${j})`);
            html += cell.outerHTML;
        }

        html += '</tr>';
    }

    html += "</table>";
    board.innerHTML = html;
    turn.innerHTML = `<p>It's ${usernameRound}'s turn.</p>`
}

function checkPlayer() {
    switch (player) {
        case 0:
            player = Math.floor(Math.random() * (2 - 1 + 1) + 1);
            if (player === 1) {
                usernameRound = username1;
            } else {
                usernameRound = username2;
            }
            break;
        case 1:
            player = 2;
            usernameRound = username2;
            break;
        case 2:
            player = 1;
            usernameRound = username1;
            break;
    }
    return player;
}
function checkWin(x, y) {

    if (
        x + 3 < boardArray.length &&
        boardArray[x][y].classList.contains('yellow') &&
        boardArray[x + 1][y].classList.contains('yellow') &&
        boardArray[x + 2][y].classList.contains('yellow') &&
        boardArray[x + 3][y].classList.contains('yellow')
    ) {
        return true;
    }

    if (
        x - 3 >= 0 &&
        boardArray[x][y].classList.contains('yellow') &&
        boardArray[x - 1][y].classList.contains('yellow') &&
        boardArray[x - 2][y].classList.contains('yellow') &&
        boardArray[x - 3][y].classList.contains('yellow')
    ) {
        return true;
    }

    if (
        y + 3 < boardArray[x].length &&
        boardArray[x][y].classList.contains('yellow') &&
        boardArray[x][y + 1].classList.contains('yellow') &&
        boardArray[x][y + 2].classList.contains('yellow') &&
        boardArray[x][y + 3].classList.contains('yellow')
    ) {
        return true;
    }

    if (
        y - 3 >= 0 &&
        boardArray[x][y].classList.contains('yellow') &&
        boardArray[x][y - 1].classList.contains('yellow') &&
        boardArray[x][y - 2].classList.contains('yellow') &&
        boardArray[x][y - 3].classList.contains('yellow')
    ) {
        return true;
    }

    if (
        x - 3 >= 0 &&
        y + 3 < boardArray[x].length &&
        boardArray[x][y].classList.contains('yellow') &&
        boardArray[x - 1][y + 1].classList.contains('yellow') &&
        boardArray[x - 2][y + 2].classList.contains('yellow') &&
        boardArray[x - 3][y + 3].classList.contains('yellow')
    ) {
        return true;
    }

    if (
        x + 3 < boardArray.length &&
        y + 3 < boardArray[x].length &&
        boardArray[x][y].classList.contains('yellow') &&
        boardArray[x + 1][y + 1].classList.contains('yellow') &&
        boardArray[x + 2][y + 2].classList.contains('yellow') &&
        boardArray[x + 3][y + 3].classList.contains('yellow')
    ) {
        return true;
    }
    if (
        x + 3 < boardArray.length &&
        y - 3 >= 0 &&
        boardArray[x][y].classList.contains('yellow') &&
        boardArray[x + 1][y - 1].classList.contains('yellow') &&
        boardArray[x + 2][y - 2].classList.contains('yellow') &&
        boardArray[x + 3][y - 3].classList.contains('yellow')
    ) {
        return true;
    }

    if (
        x - 3 >= 0 &&
        y - 3 >= 0 &&
        boardArray[x][y].classList.contains('red') &&
        boardArray[x - 1][y - 1].classList.contains('red') &&
        boardArray[x - 2][y - 2].classList.contains('red') &&
        boardArray[x - 3][y - 3].classList.contains('red')
    ) {
        return true;
    }
    if (
        x + 3 < boardArray.length &&
        boardArray[x][y].classList.contains('red') &&
        boardArray[x + 1][y].classList.contains('red') &&
        boardArray[x + 2][y].classList.contains('red') &&
        boardArray[x + 3][y].classList.contains('red')
    ) {
        return true;
    }

    if (
        x - 3 >= 0 &&
        boardArray[x][y].classList.contains('red') &&
        boardArray[x - 1][y].classList.contains('red') &&
        boardArray[x - 2][y].classList.contains('red') &&
        boardArray[x - 3][y].classList.contains('red')
    ) {
        return true;
    }

    if (
        y + 3 < boardArray[x].length &&
        boardArray[x][y].classList.contains('red') &&
        boardArray[x][y + 1].classList.contains('red') &&
        boardArray[x][y + 2].classList.contains('red') &&
        boardArray[x][y + 3].classList.contains('red')
    ) {
        return true;
    }

    if (
        y - 3 >= 0 &&
        boardArray[x][y].classList.contains('red') &&
        boardArray[x][y - 1].classList.contains('red') &&
        boardArray[x][y - 2].classList.contains('red') &&
        boardArray[x][y - 3].classList.contains('red')
    ) {
        return true;
    }
    if (
        x - 3 >= 0 &&
        y + 3 < boardArray[x].length &&
        boardArray[x][y].classList.contains('red') &&
        boardArray[x - 1][y + 1].classList.contains('red') &&
        boardArray[x - 2][y + 2].classList.contains('red') &&
        boardArray[x - 3][y + 3].classList.contains('red')
    ) {
        return true;
    }

    // Check for diagonal win (downward)
    if (
        x + 3 < boardArray.length &&
        y + 3 < boardArray[x].length &&
        boardArray[x][y].classList.contains('red') &&
        boardArray[x + 1][y + 1].classList.contains('red') &&
        boardArray[x + 2][y + 2].classList.contains('red') &&
        boardArray[x + 3][y + 3].classList.contains('red')
    ) {
        return true;
    }
    if (
        x + 3 < boardArray.length &&
        y - 3 >= 0 &&
        boardArray[x][y].classList.contains('red') &&
        boardArray[x + 1][y - 1].classList.contains('red') &&
        boardArray[x + 2][y - 2].classList.contains('red') &&
        boardArray[x + 3][y - 3].classList.contains('red')
    ) {
        return true;
    }

    if (
        x - 3 >= 0 &&
        y - 3 >= 0 &&
        boardArray[x][y].classList.contains('red') &&
        boardArray[x - 1][y - 1].classList.contains('red') &&
        boardArray[x - 2][y - 2].classList.contains('red') &&
        boardArray[x - 3][y - 3].classList.contains('red')
    ) {
        return true;
    }
    // No win found
    return false;
}
