var isCircle = (Math.random()) > 0.5; // determina quem começa
var gameBoardSize = 3;
var posMarked = 0

/**
 * TODO:
 * fazer sistema de skin: céu azul, caderno, grama
 *      - ceu azul: x = sol, o = nuvem
 *      - grama: x = bixo-pau, o = joaninha
 */

var currentPlayer = document.getElementById("player")

function getCurrentSymbol() {
    return isCircle ? "circle" : "cross"
}

function initializeBoard() {
    const gameBoard = document.getElementById("game-board");
    let count = 0;

    gameBoard.innerHTML = '';

    for (let i = 0; i < gameBoardSize; i++) {
        const newRow = document.createElement("tr")

        for (let j = 0; j < gameBoardSize; j++) {
            const newCollumn = document.createElement("td")

            newCollumn.onclick = function () {
                selectSquare(this);
            };
            newCollumn.id = count;
            count++

            newRow.appendChild(newCollumn)
        }

        gameBoard.appendChild(newRow)
    }

    posMarked = 0
}

function initializeGame() {
    setPlayer(getCurrentSymbol())
    initializeBoard()
}

function changeBoardSize(isIncrease) {
    isIncrease ? gameBoardSize++ : gameBoardSize--

    if (gameBoardSize < 1) {
        gameBoardSize = 1
    }

    initializeBoard()
}

function selectSquare(clickedSquare) {
    if (clickedSquare.className === "") {
        markSquare(clickedSquare)
        checkWinCondition()
        changePlayer()
    } else {
        alert("This position has been already marked")
    }
}

function changePlayer() {
    isCircle = !isCircle

    setPlayer(getCurrentSymbol())
}

function setPlayer() {
    currentPlayer.textContent = `Current Player: ${getCurrentSymbol()}`
}

function markSquare(clickedSquare) {
    clickedSquare.className = getCurrentSymbol();

    posMarked++
}

function checkWinCondition() {
    const gameBoard = document.getElementById("game-board");
    const rows = gameBoard.children;
    let winHorPoints = 0;
    let winVerPoints = 0;
    let winDiaLeftPoints = 0;
    let winDiaRightPoints = 0;
    let shouldCheckCols = true;

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i]
        let cols = row.children

        for (let j = 0; j < cols.length; j++) {
            let col = cols[j];
            let diaLeftI = 0;
            let diaRightI = gameBoardSize - 1;

            if (col.className == getCurrentSymbol()) {
                winHorPoints++
            }

            if (winHorPoints == gameBoardSize) {
                winAlert()
                return;
            }

            if (shouldCheckCols) {
                for (let h = 0; h < rows.length; h++) {
                    let verRow = rows[h]
                    let verCol = verRow.children[j]
                    let diaRigthtCol = verRow.children[diaRightI]
                    let diaLeftCol = verRow.children[diaLeftI]

                    if (verCol.className == getCurrentSymbol()) {
                        winVerPoints++
                    }

                    if (diaRigthtCol && diaRigthtCol.className == getCurrentSymbol()) {
                        winDiaRightPoints++
                    }

                    if (diaLeftCol && diaLeftCol.className == getCurrentSymbol()) {
                        winDiaLeftPoints++
                    }

                    if (
                        winVerPoints === gameBoardSize ||
                        winDiaRightPoints === gameBoardSize ||
                        winDiaLeftPoints === gameBoardSize
                    ) {
                        winAlert();
                        return;
                    }

                    diaLeftI++
                    diaRightI--
                }
            }

            shouldCheckCols = false
            winVerPoints = 0
            winDiaRightPoints = 0
            winDiaLeftPoints = 0
        }

        rowBuf = row;
        winHorPoints = 0
    }

    if (posMarked == gameBoardSize ** 2) {
        drawAlert()
        return;
    }
}

function timeoutReload() {
    setTimeout(function () {
        window.location.reload();
    }, 2000);
}

function winAlert() {
    alert(`${getCurrentSymbol()} has won!`);
    timeoutReload()
    
}

function drawAlert() {
    alert("There is a draw!")
    timeoutReload()
}


document.addEventListener('DOMContentLoaded', function () {
    initializeGame()
});