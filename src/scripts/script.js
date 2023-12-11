
let board = document.getElementById('board');
let cells = [];
let boardArray = [];
let player = 0;

function main() {
    let height = prompt('How many rows do you want?'); // modulable height
    let width = prompt('How many columns do you want?'); // modulable width
    if (isNaN(height) || isNaN(width) || height <= 0 || width <= 0) {
        alert('Please enter valid positive numbers for height and width.');
        return;
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
            cell.classList.add('normal')
            html += cell.outerHTML;
            cells.push('normal'); // push the normal word to note that the color is white into the cells array
            boardArray[i][j] = cell; // update boardArray with the cell element
        }
        html += '</tr>';
    }
    html += "</table>";

    board.innerHTML = html;
    board.style.height = height * 70 + 'px';
    board.style.width = width * 70 + 'px';
}

function changeColor(x, y) {
    let currentPlayer = checkPlayer()
    let cell = boardArray[x][y];
    if (!cell.classList.contains('yellow') && !cell.classList.contains('red')) {
        if (currentPlayer == 1) {
            cell.classList.remove('normal');
            cell.classList.add('yellow');
            updateBoard();
        } else if (currentPlayer == 2) {
            cell.classList.remove('normal');
            cell.classList.add('red');
            updateBoard();
        }
    } else {
        alert('Cell already changed!');
    }

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
            player = 2
            break
        case 2:
            player = 1
            break
    }
    return player
}

main();
