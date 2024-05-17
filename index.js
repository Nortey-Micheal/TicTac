function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell())
        }
        
    }

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
        // getBoard()
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
            console.log(`${name} has won this round`)
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
            console.log("This is a tie")
        }
    }

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
        playRound
    }
}

function GameUI(){
    const game = GameController();
}
