function draw(boardArray) {
    for (let i = 0; i < boardArray.length; i++) {
        for (let j = 0; j < boardArray[i].length; j++) {
            if (!boardArray[i][j].classList.contains('yellow') && !boardArray[i][j].classList.contains('red')) {
                return false;
            }
        }
    }
    return true;
}
