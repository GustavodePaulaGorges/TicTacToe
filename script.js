// 2 bugs: quando ganha na ultima jogada ele dá o alert de ganhar E o de empate; texto que fala qual o jogador não é iniciado.

var isGreen = (Math.random()) > 0.5; // determina quem começa
var gameBoardWidth = 3;
var posMarked = 0
var winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
var positions = ["", "", "", "", "", "", "", "", ""]
var currentPlayer = document.getElementById("player")

changePlayer() // meio bucha ne

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
    let color = isGreen ? "green" : "red"
    isGreen = !isGreen

    currentPlayer.textContent = `Current Player: ${color}`
}

function markSquare(clickedSquare) {
    let color = isGreen ? "green" : "red"

    clickedSquare.className = color;
    positions[parseInt(clickedSquare.id)] = clickedSquare.className

    posMarked++
}

function checkWinCondition() {
    let color = isGreen ? "green" : "red"

    winConditions.forEach((winCon) => {
        square1 = positions[winCon[0]]\
        square2 = positions[winCon[1]]
        square3 = positions[winCon[2]]

        if (square1 === "" || square2 === "" || square3 === "") {
            return;
        }

        if (square1 === square2 && square2 === square3) {
            winAlert(color)
        }
    });

    if (posMarked === (gameBoardWidth ** 2)) {
        drawAlert();
    }
}

function winAlert(color) {
    alert(`The color ${color} has won!`);

    setTimeout(function () {
        window.location.reload();
    }, 2000);
}

function drawAlert() {
    alert("There is a draw!")

    setTimeout(function () {
        window.location.reload();
    }, 2000);
}