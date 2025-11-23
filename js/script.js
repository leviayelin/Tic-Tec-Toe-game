// Tic-Tac-Toe Game 
// next :
// - stat new game button 
// - score section 
// - loacl storage implament
// =====================================

// ================ Selector section ================

// getting game board 
let board = document.getElementsByClassName('hide')[0];
// getting all cells 
const cells = document.querySelectorAll('.board span');
// getting new game button element
const newGame = document.getElementById('b-new-game')
// getting messages element
let gameMessage = document.getElementById('message-box');
// scores display 
const scoreDisplay = document.querySelectorAll('.display li span');

// start game btn
let startGame = false;

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

// ================ Local storage section ================

let gameScore = JSON.parse(localStorage.getItem('score')) || [{O_player:0,X_player:0}];

// ================ Functions section ================

// displaying scores 
const updateDisplay = () =>{
    for(let i = 0; i < scoreDisplay.length; i++){
        if(scoreDisplay[i].classList.contains('O')){
            scoreDisplay[i].textContent = gameScore[0].O_player;
        }
        else if(scoreDisplay[i].classList.contains('X')){
            scoreDisplay[i].textContent = gameScore[0].X_player;
        }  
    }    
};

updateDisplay();

// Main - creating looping conditions to check for 
// winner every turn 
const checkForWin = () =>{
    // loop through winning patterns 
    for(let combo of winningPatterns){
        // settings variables for each cell in combo set
        let [a,b,c] = combo;
        // getting inner cell X or O
        let cellA = document.getElementById(a).innerHTML;
        let cellB = document.getElementById(b).innerHTML;
        let cellC = document.getElementById(c).innerHTML;
        
        // condition - checking metching cell in each combo cell
        // if true then X or O win
        if(cellA && cellA == cellB && cellA == cellC ){
            // saveScoreData(cellA)
            if(cellA == 'X'){
                let newData = parseInt(gameScore[0].X_player);
                newData += 1;
                gameScore[0].X_player = newData;
                localStorage.setItem('score', JSON.stringify(gameScore));
                updateDisplay()
            }
            if(cellA == 'O'){
                let newData = parseInt(gameScore[0].O_player);
                newData += 1;
                gameScore[0].O_player = newData;
                localStorage.setItem('score', JSON.stringify(gameScore));
                updateDisplay()                
            }
            gameMessage.innerHTML = `<p class='messages'>${cellA} Wins!</p>`;
            gameOver = true;
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
    return false;
};

// Reaseting game - clearing all cells  
const gameReset = () =>{
    cells.forEach(cell => cell.innerHTML = "");
    gameMessage.innerHTML = "";
    currentPlayer = 'X';
    gameOver = false;
};

// Computer - creating rendom cell pick 
const secondPlayer = () =>{
    let pH = [];
    for(let i = 0; i < cells.length; i++){
       pH.push(cells[i].innerHTML);
    }
};

// score board - saving to local storage 
const saveScoreData = () =>{
    if(gameScore === null){
        gameScore = [];
        let scoreData = {O_player:0,X_player:0};
        gameScore.push(scoreData);
    }
    // store new data in local browser storage
    localStorage.setItem("score",JSON.stringify(gameScore));
}

// Current player Game play - Click event 
cells.forEach(cell =>{
    cell.addEventListener('click', e =>{
        if(gameOver) return
        // condition : check if cell is empty
        if(e.target.innerHTML === ""){
            e.target.innerHTML = currentPlayer;
            // condition : check for winner player,
            // and change player turn 
            if(!checkForWin()){
                currentPlayer = currentPlayer === "X"? "O":"X";
            }
        }
    })
})

// ================ Event listener section ================

// starting new game 
newGame.addEventListener('click',gameReset)

