// Tic-Tac-Toe Game 
// =====================================

// Selector section 
// getting game board 
let board = document.getElementsByClassName('hide')[0];
// getting all cells 
const cells = document.querySelectorAll('.board span');
// getting new game button element
const newGame = document.getElementById('b-new-game')
// getting messages element
let gameMessage = document.getElementById('message-box');

// Creating Winning patterns combos -
// (rows,columns,diagnoal)
const winningPatterns = [
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[2,5,8],[3,6,9],
    [1,5,9],[3,5,7],
];

// Players - Current player (start with 'X')
let currentPlayer = "X";
let gameOver = false;

// Functions section 
// Main - creating looping conditions to check for 
// winner every turn 
const checkForWin = () =>{
    // loop through winning patterns 
    for(let combo of winningPatterns){
        let [a,b,c] = combo;

        let cellA = document.getElementById(a).innerHTML;
        let cellB = document.getElementById(b).innerHTML;
        let cellC = document.getElementById(c).innerHTML;
        
        
        // checking for win
        if(cellA && cellA == cellB && cellA == cellC ){
            gameMessage.innerHTML = `<p class='messages'>${cellA} Wins!</p>`;
            gameOver = true
            return true
        }   
    }
    
    // checking for draw 
    const everyCellFilled = [...cells].every(cell =>cell.innerHTML != "")
    if(everyCellFilled){
        gameMessage.innerHTML = `<p class='messages'>it's a Draw! no winners</p>`
        gameOver = true
        return true
    }
    return false
};


// Reaseting game 
const gameReset = () =>{
    cells.forEach(cell => cell.innerHTML = "")
    gameMessage.innerHTML = ""
    currentPlayer = 'X'
    gameOver = false
}

// Computer - creating rendom cell pick 
const secondPlayer = () =>{
    let pH = []
    for(let i = 0; i < cells.length; i++){
       pH.push(cells[i].innerHTML)
    }
}

// Current player Game play - Click event 
cells.forEach(cell =>{
    cell.addEventListener('click', e =>{
        if(gameOver) return
        // condition : check if cell is empty
        if(e.target.innerHTML === ""){
            e.target.innerHTML = currentPlayer;
            secondPlayer()
            // condition : check for winner player,
            // and change player turn 
            if(!checkForWin()){
                currentPlayer = currentPlayer === "X"? "O":"X";
            }
        }
    })
})

// starting new game 
newGame.addEventListener('click',gameReset)

