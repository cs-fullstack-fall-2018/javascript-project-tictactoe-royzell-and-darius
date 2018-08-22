// Setup your Variables

// Handle Restart game button


// Grab all the play spaces in the board


// Clear all the play spaces in the board


// Setup click handlers for each play space on the board


// Handle a play space being clicked


// Switch player turn


// Check for winner or CAT/tie


var game = (() => {
    var gameBoard = createBoard();
    var player = newPlayer();
    var computer = newComputerPlayer();
    var boardContainer = document.querySelector(".Board");
    var scoreContainer = document.querySelector(".Score");
    var lastPlayer = "";

    // "E" represent empty slots in the board

    drawGame(gameBoard, player);

    //Create the HTML elements to display board and score
    function drawGame(gameBoard, player, winningLines) {
        for (var i = 0; i < 9; i++) {
            const p = document.createElement("p");

            p.innerHTML = gameBoard[i];
            p.classList = "grid-element";
            p.id = `element${i}`;

            p.addEventListener("click", function () {
                if (this.innerHTML === "E") {
                    // Player turn
                    player.play(this, i);
                    checkState(gameBoard);
                    // Computer turn
                    if (!isBoardFull(gameBoard)) {
                        computer.play();
                        checkState(gameBoard);
                    }
                }
            });

            boardContainer.appendChild(p);
        }
        //Add score to its container
        const c = document.createElement("p");
        c.classList = "Score";
        c.innerHTML = `${player.getName()} score: ${player.getScore()} 
                      ${computer.getName()} score: ${computer.getScore()}`;

        scoreContainer.appendChild(node);
    }

    // Checks if the board contains any winning line
    function lookForWinner(gameBoard) {
        const winningLines = [[0, 1, 2],
            [3, 4, 5], [6, 7, 8], [0, 3, 6],
            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        var winner = winningLines.some(function (line) {
            return (line.every(function (slot) {
                return (gameBoard[slot] === lastPlayer)
            }));
        });

        return winner;
    }

    function displayWinner() {
        const scoreText = document.querySelector(".Score");

        if (lastPlayer === "X") {
            player.addPoint();
            lastPlayer = player.getName();
        } else {
            computer.addPoint();
            lastPlayer = computer.getName();
        }

        scoreText.innerHTML = `${player.getName()} Score: ${player.getScore()} 
                           ${computer.getName()} Score: ${computer.getScore()}`;
    }


    function checkState(gameBoard) {
        if (lookForWinner(gameBoard)) {
            displayWinner();
            resetBoard();
        } else if (isBoardFull(gameBoard)) {
            resetBoard();
        }
    }

    //Checks if the board is full
    function isBoardFull(gameBoard) {
        return (gameBoard.every(function (slot) {
            return slot !== "E"
        }));
    }


    function createBoard() {
        var gameBoard = [];
        for (let i = 0; i < 9; i++) {
            gameBoard.push("E");
        }
        return gameBoard;
    }

    function resetBoard() {
        setTimeout(() => {
            var matchResult = document.querySelector(".Score");
            matchResult.classList.remove("visible-text");
            lastPlayer = "";
            for (let i = 0; i < 9; i++) {
                const gridElement = document.getElementById(`element${i}`);
                gridElement.classList.remove("visible-text");
                gridElement.innerHTML = "E";
                gameBoard[i] = "E";
            }
        }, 1000)
    }

    // Player factory
    function newPlayer() {
        const name = prompt("Please, enter your name", "Player");
        var score = 0;
        var getName = name;
        var getScore = score;
        var addPoint = (score += 1);
        var play = (node, i) => {
            node.innerHTML = "X";
            node.classList.add("visible-text");
            gameBoard[i] = "X";
            lastPlayer = "X";
        };

        return {getName, getScore, addPoint, play}
    }

    // ComputerPLayer factory
    function newComputerPlayer() {
        var name = "Computer";
        var score = 0;
        var getName = () => name;
        var getScore = () => score;
        var addPoint = () => {
            score += 1
        };
        //Computer makes a valid move
        const play = () => {
            var randomNum = Math.floor(Math.random() * 9);
            var target = document.getElementById(`element${randomNum}`);

            while (target.innerHTML != "E") {
                randomNum = Math.floor(Math.random() * 9);
                target = document.getElementById(`element${randomNum}`);
            }

            target.innerHTML = "O";
            target.classList.add("visible-text");
            gameBoard[randomNum] = "O";
            lastPlayer = "O";
        };

        return {getName, getScore, addPoint, play}
    }
    

})();





game();