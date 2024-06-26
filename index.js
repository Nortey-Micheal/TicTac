function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];
    const xScore = document.querySelector(".scoreBoard>div:first-of-type>p:last-of-type");
    const tieScore = document.querySelector(".scoreBoard>div:nth-of-type(2)>p:last-of-type");
    const oScore = document.querySelector(".scoreBoard>div:last-of-type>p:last-of-type");
    const newGame = document.querySelector("section>div button:first-of-type")

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell())
        }
        
    }

    //initial scores
    let Xscore = 0;
    let Tscore = 0;
    let Oscore = 0;


    const getBoard = () => board;

    function Cell(){
        let value = "";
        const newValue = (marker) => {
            value = marker;
        }

        const getValue = () => value;

        return {
            newValue,
            getValue
        }
    }

    function insertValue(row,column,name,marker){
        const available = (board[row][column].getValue() === ""); //takes the selected space
        if (available) {
            board[row][column].newValue(marker)
        }else{
            console.log(`Current Player is ${name} with this marker ${marker}`) //prevent players from 
            throw new Error("Location already taken"); //adding new values to aready taken spaces
        }
        
    }

    
    //check if there is a winner or tie for the current run of the game
    function checkWin(name,marker){
        const boardDiv = document.querySelector(".board")
        const endText =      document.querySelector("section>div>p:first-of-type")
        const winnerText = document.querySelector("section>div>p:last-of-type")
        const section = document.querySelector("section")

        if (board[0][0].getValue() === marker &&// leading diagonal \
         board[1][1].getValue() === marker &&
         board[2][2].getValue() === marker ||//top row
         board[0][0].getValue() === marker &&
         board[0][1].getValue() === marker &&
         board[0][2].getValue() === marker ||//middle row
         board[1][0].getValue() === marker &&
         board[1][1].getValue() === marker &&
         board[1][2].getValue() === marker ||// bottom row
         board[2][0].getValue() === marker &&
         board[2][1].getValue() === marker &&
         board[2][2].getValue() === marker ||//first column
         board[0][0].getValue() === marker &&
         board[1][0].getValue() === marker &&
         board[2][0].getValue() === marker ||//middle column
         board[0][1].getValue() === marker &&
         board[1][1].getValue() === marker &&
         board[2][1].getValue() === marker ||// last column
         board[0][2].getValue() === marker &&
         board[1][2].getValue() === marker &&
         board[2][2].getValue() === marker ||// opposite diagonal /
         board[0][2].getValue() === marker &&
         board[1][1].getValue() === marker &&
         board[2][0].getValue() === marker 
         ) {           
            if (marker === "X") {
            endText.textContent = "This is the end of the round";
            winnerText.textContent = `${name} has won this round`;
            section.style.display = "flex";
            Xscore++;
           } else {
            endText.textContent = "This is the end of the round";
            winnerText.textContent = `${name} has won this round`;
            section.style.display = "flex";
            Oscore++;
           }
        }else if(board[0][0].getValue() !== "" &&
                 board[0][1].getValue() !=="" &&
                 board[0][2].getValue() !== "" &&
                 board[1][0].getValue() !== "" &&
                 board[1][1].getValue() !== "" &&
                 board[1][2].getValue() !== "" &&
                 board[2][0].getValue() !== "" &&
                 board[2][1].getValue() !== "" &&
                 board[2][2].getValue() !== "")
            {
            endText.textContent = "This is a tie"   ;     
            winnerText.textContent = "No one won this round";
            section.style.display = "flex";
            Tscore++
        }

        const getX = () => Xscore;
        const getT = () => Tscore;
        const getO = () => Oscore;
        const resetX = () => {
            Xscore = 0;
        }
        const resetT = () => {
            Tscore = 0;
        }
        const resetO = () => {
            Oscore = 0;
        }


        xScore.textContent = Xscore;
        tieScore.textContent = Tscore;
        oScore.textContent = Oscore;

        return {
            getO,
            getT,
            getX,
            resetO,
            resetT,
            resetX
        }
        
    }

    checkWin().getO();
    checkWin().getT();
    checkWin().getX();

    

    

  // This method will be used to print our board to the console.
  // It is helpful to see what the board looks like after each turn as we play,
  // but we won't need it after we build our UI
    const printBoard = () => {
       const boardWithCellValues = board.map((row) => row.map((Cell) => Cell.getValue()))
       console.log(boardWithCellValues);
    };
 
return {getBoard,insertValue,printBoard,checkWin}
}

function GameController(
    player1 = "Player1",
    player2 = "Player2"
) {
    const boards = Gameboard();
    const Players = [
        {
            name: player1,
            marker: "X"
        },
        {
            name: player2,
            marker: "O"
        }
    ]

    let currentPlayer = Players[0]

    function swapPlayers(){ //swapPlayers
        currentPlayer = currentPlayer === Players[0] ? Players[1] : Players[0];
        return {currentPlayer}
    }

    const getCurrentPlayer = () => currentPlayer;

    function NewRoundMessage() {
        boards.printBoard() //Display current Board and players
        
        console.log(`Current Player is ${currentPlayer.name} with the marker ${currentPlayer.marker}`)
    }

    function playRound(row,column){
        console.log(
            `${getCurrentPlayer().name} IS INSERTING 
            ${getCurrentPlayer().marker} IN ROW: ${row} AND COLUMN: ${column}`
        );
        boards.insertValue(row,column,getCurrentPlayer().name,getCurrentPlayer().marker);
        boards.checkWin(getCurrentPlayer().name,getCurrentPlayer().marker)
        swapPlayers();
        NewRoundMessage();
        
    }

    NewRoundMessage(); //first round

    return{
        getCurrentPlayer,
        playRound,
        getBoard: boards.getBoard,
        checkWin: boards.checkWin
    }
}

function GameUI(){
    const game = GameController();
    const playerTurnCont = document.querySelector(".playerTurn");
    const boardDiv = document.querySelector(".board");
    const section = document.querySelector("section");
    const restartBtn = document.querySelector("section>div button:last-of-type");
    const refreshBtn = document.querySelector("main>div>div>div:first-of-type>button");
    const xScore = document.querySelector(".scoreBoard>div:first-of-type>p:last-of-type");
    const tieScore = document.querySelector(".scoreBoard>div:nth-of-type(2)>p:last-of-type");
    const oScore = document.querySelector(".scoreBoard>div:last-of-type>p:last-of-type");
    const newGame = document.querySelector("section>div button:first-of-type")
    
    const updateScreen = (funct) => {
        //clear the board
        boardDiv.textContent = "";

        //get newest version of current player and board
        const board = game.getBoard()
        const currentPlayer = game.getCurrentPlayer();

        //display current player's turn
        playerTurnCont.textContent = `${currentPlayer.marker} : ${currentPlayer.name}'s turn`;

        //Render board squares
        board.forEach((row,indexi)=> {
            row.forEach((cell,index) =>{
                //All clickables should be buttons!!
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = indexi;
                cellButton.dataset.column = index;
                cellButton.textContent = cell.getValue();
                if (cellButton.textContent === "X"){
                    cellButton.classList.add("player1");
                } else if(cellButton.textContent === "O"){
                    cellButton.classList.add("player2");
                }
                boardDiv.appendChild(cellButton)
            })
        })

        function restart(){
            boardDiv.textContent = "";
            board.forEach((row,indexi)=> {
                row.forEach((cell,index) =>{
                    //All clickables should be buttons!!
                    const cellButton = document.createElement("button");
                    cellButton.classList.add("cell");
                    cellButton.dataset.row = indexi;
                    cellButton.dataset.column = index;
                    cellButton.textContent = cell.newValue("");
                    boardDiv.appendChild(cellButton);
                })
            })
            section.style.display = "none";
            boardDiv.addEventListener("click",clickEvenHandler)
        }

        function NewGame() {
            xScore.textContent = game.checkWin().resetX();
            tieScore.textContent = game.checkWin().resetT();
            oScore.textContent = game.checkWin().resetO();
            boardDiv.textContent = "";
            board.forEach((row,indexi)=> {
                row.forEach((cell,index) =>{
                    //All clickables should be buttons!!
                    const cellButton = document.createElement("button");
                    cellButton.classList.add("cell");
                    cellButton.dataset.row = indexi;
                    cellButton.dataset.column = index;
                    cellButton.textContent = cell.newValue("");
                    boardDiv.appendChild(cellButton);
                })
            })
            section.style.display = "none";
            boardDiv.addEventListener("click",clickEvenHandler)
        }

        newGame.addEventListener("click", NewGame)

        if(section.style.display === "flex"){
            boardDiv.removeEventListener("click",funct);
            restartBtn.addEventListener("click",restart);
        }

        refreshBtn.addEventListener("click",restart)
    }

    function clickEvenHandler(event) {
        const clickedRow = event.target.dataset.row;
        const clickedColumn = event.target.dataset.column;

        if(!clickedColumn || !clickedRow) return;
        game.playRound(clickedRow,clickedColumn);
        updateScreen(clickEvenHandler);
    }

    boardDiv.addEventListener("click",clickEvenHandler);

    //Initial render
    updateScreen()
}

GameUI();