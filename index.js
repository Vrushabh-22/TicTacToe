//////////////////////////Selecting Elements/////////////////////////////////

const statusDiv = document.querySelector('.status');
const actualCells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.resetBtn');

//////////////////////////Initial Values/////////////////////////////////

const winingCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
];

let currentPlayer;
let logicalCells;


//////////////////////////Functions/////////////////////////////////
function initialStage(){
    currentPlayer = "X"
    statusDiv.innerText = `Current Player - ${currentPlayer}` 
    logicalCells = ["","","","","","","","",""];
    resetBtn.classList.remove('active')

    actualCells.forEach(function(cell){
        cell.innerText = "";
        cell.classList.remove('win')
        cell.style.pointerEvents = "all"
    })

    
}
initialStage();


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O"
    }else{
        currentPlayer = "X"
    }
    
    statusDiv.innerText = `Current Player - ${currentPlayer}` 

}

function checkGameStatus(){
    let winner = "";
    winingCombo.forEach(function(combination){
        if(
            (logicalCells[combination[0]] !== "" && logicalCells[combination[1]] !== "" && logicalCells[combination[2]] !== "")
            && (logicalCells[combination[0]] === logicalCells[combination[1]])
            && (logicalCells[combination[1]] === logicalCells[combination[2]])
        ){

            winner = logicalCells[combination[0]];


            actualCells[combination[0]].classList.add('win')
            actualCells[combination[1]].classList.add('win')
            actualCells[combination[2]].classList.add('win')

        } 
    })

    if(winner){
        resetBtn.classList.add('active');
        statusDiv.innerText = `Winner Player - ${winner}`
        actualCells.forEach(function(cell){
            cell.style.pointerEvents = "none"
        })
        
    }

    let emptyCount = 0;
    logicalCells.forEach(function(cell){
        if(cell === ""){
            emptyCount++;
        }
    })

    if(emptyCount === 0){
        resetBtn.classList.add('active');
        statusDiv.innerText = "Game Tied!"

    }

}



actualCells.forEach(function(cell, index){
    cell.addEventListener("click", function(){
        cell.innerText = currentPlayer;
        logicalCells[index] = currentPlayer;
        cell.style.pointerEvents = "none"
        swapTurn();

        checkGameStatus();
        

    });
})


//////////////////////////Listners/////////////////////////////////
resetBtn.addEventListener("click", initialStage)