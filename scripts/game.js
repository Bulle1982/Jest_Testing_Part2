let game = {
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: ["button1", "button2", "button3", "button4"],
    score: 0,
};

/**
 * newGame() work:
 * reset the score to zero
 * empty the computer sequence array
 * empty the player moves array.
 */
function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];

    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {

                    let move = e.target.getAttribute("id");
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();

                }
               
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();

};

/**
 * addTurn():
 * It needs to clear the playerMoves array since this is the start of a new turn
 * It needs to randomly select one of the available choices from our game.choices key and push that into the computer sequence array.
 */

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns()
}

/**
 * showScore():
 * Gets the element with the ID of score and
 * Sets its innerText to game.score
 */
function showScore() {
    document.getElementById("score").innerText = game.score;
}

/**
 * lightsOn(circ):
 * Get the element with the ID of the circle that we passed in.
 * Add the light class
 * And then using JavaScripts setTimeout() function to remove this class after 400 milliseconds.
 */
function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light")
    }, 400);
};

/**
 * showTurns() should:
 * Step through current game
 * Turn on the light
 * Turn off the light
 */

function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
    lightsOn(game.currentGame[game.turnNumber]);
    game.turnNumber++;

    if (game.turnNumber >= game.currentGame.length) {
        clearInterval(turns);
        game.turnInProgress = false;
    }
    }, 800);
};

function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {

        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }

    } else {
        alert("Wrong move!");
        newGame();
    }
    
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };