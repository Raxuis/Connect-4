
let n = '<div class="normal"></div>'//normal piece
let y = '<div class="yellow"></div>' //yellow piece(player 1)
let r = '<div class="red"></div>' //red piece(player 2)

let board = document.getElementById('board');

let boardArray = []

function start() {
    height = prompt('How many columns do you want?')//modulable height
    width = prompt('How many rows do you rows?')//modulable width
    boardCreation(height, width)
}
function boardCreation(height, width) {

    let html = "<table>";
    for (i = 0; i < height; i++) {
        boardArray[i] = [];
        html += "<tr>";
        for (j = 0; j < width; j++) {
            html += "<td>" + n + "</td>";
        }
        html += '</tr>'

    }
    html += "</table>";
    board.innerHTML = html
    board.style.height = height * 70 + 'px';
    board.style.width = width * 70 + 'px';
}
start()