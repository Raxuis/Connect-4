let board = document.getElementById('board');
let cells = [];
let boardArray = [];
let player = 0; // By default the player value is equal to 0 to help the function checkPlayer()

function main() {
    let height = prompt('How many rows do you want?'); // modulable height
    let width = prompt('How many columns do you want?'); // modulable width
    if (isNaN(height) || isNaN(width) || height <= 0 || width <= 0) {
        alert('Please enter valid positive numbers for height and width.');
        window.location.reload()
    }
    boardCreation(height, width);
    console.log(cells);
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
            cells.push('normal');
            boardArray[i][j] = cell; // update boardArray with the cell element
        }
        html += '</tr>';
    }
    html += "</table>";

    board.innerHTML = html;
    board.style.height = height * 70 + 'px';
    board.style.width = width * 70 + 'px';
}

function changeColor(row, col) {
    let currentPlayer = checkPlayer();

    for (let i = boardArray.length - 1; i >= 0; i--) {
        let cell = boardArray[i][col];
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
    // Add the win condition
}

function updateBoard() {
    board.innerHTML = "";

    let html = "<table>";

    for (let i = 0; i < boardArray.length; i++) {
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

main();
