let board = document.getElementById('board');
let time = document.getElementById('time');
let boardArray = [];
let player = 0; // By default the player value is equal to 0 to help the function checkPlayer()
let col = 0
function main() {
    let height = parseInt(prompt('How many rows do you want?')); // modulable height
    let width = parseInt(prompt('How many columns do you want?')); // modulable width
    if (isNaN(height) || isNaN(width) || height <= 0 || width <= 0) {
        alert('Please enter valid positive numbers for height and width.');
        window.location.reload()
    }
    boardCreation(height, width);
    timer(time)

}

function boardCreation(height, width) {
    let html = "<table>";
    for (let i = 0; i < height; i++) {
        boardArray[i] = [];
        html += "<tr>";
        for (let j = 0; j < width; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('onclick', `changeColor(${i}, ${j})`);
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
}

function changeColor(x, y) {
    console.log(x, y)
    let currentPlayer = checkPlayer();

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
        alert(`Congratulations! Player ${currentPlayer} wins!`)
        window.location.reload()
    } else {
        if (isDraw) {
            alert("It's a Draw!");
            window.location.reload();
        }
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
            cell.setAttribute('onclick', `changeColor(${i}, ${j})`);
            html += cell.outerHTML;
        }

        html += '</tr>';
    }

    html += "</table>";
    board.innerHTML = html;
}

function checkPlayer() {
    switch (player) {
        case 0:
            player = 1
            break
        case 1:
            player = 2;
            break;
        case 2:
            player = 1;
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

main();
