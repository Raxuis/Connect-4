
let board = document.getElementById('board')
let pieces = document.getElementById('piece')

let n = 'n' //normal piece
let y = 'y' //yellow piece(player 1)
let r = 'r' //red piece(player 2)

let height = 10 //modulable height
let width = 10 //modulable width

let boardArray = []


function boardCreation(height, width) {
    for (let i; i < height; i++) {
        for (let j; i < width; j++) {
            boardArray.push('n')
        }
        boardArray.push('n')
    }
    console.log(boardArray)
}
boardCreation(height, width)