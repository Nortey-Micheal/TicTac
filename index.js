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
        const available = (board[row][column].getValue() === "");
        if (available) {
            board[row][column].newValue(marker)
        } else{
            console.log(`Current Player is ${name} with this marker ${marker}`)
            throw new Error("Location already taken");
            
        }
        
    }

  // This method will be used to print our board to the console.
  // It is helpful to see what the board looks like after each turn as we play,
  // but we won't need it after we build our UI
    const printBoard = () => {
       const boardWithCellValues = board.map((row) => row.map((Cell) => Cell.getValue()))
       console.log(boardWithCellValues);
    };
 
return {getBoard,insertValue,printBoard}
}



function Players(){

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
        swapPlayers();
        NewRoundMessage()
    }

    NewRoundMessage(); //first round

    return{
        getCurrentPlayer,
        playRound}
}

const game = GameController();
// game.playRound(1,1);
// game.playRound(0,2);
// game.playRound(0,2);
