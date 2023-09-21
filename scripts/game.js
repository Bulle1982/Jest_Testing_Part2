let game = {
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    score: 0,
};

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    showScore();
};

function showScore() {
    document.getElementById("score").innerText = game.score;
}
module.exports = { game, newGame, showScore };