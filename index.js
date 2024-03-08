const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//lets create a function to initialise the game
function initGame()
{
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // ui pr empty bhi karna padega boxes ko
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.style.pointerEvents="all"; 
        // initialize box with css property again
        box.classList=`box b${index +1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();
// boxes are element list 
// here we take index for accessing particular box class
// and not take event.target

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index)
{
    if(gameGrid[index]==="")
    {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap karo turn ko
        swapTurn();
        // ckeck koi jeet toh nahi gya
        checkGameOver();//imp
    }
}

function swapTurn()
{
    
    if(currentPlayer==="X")
    {
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI update for paragraph
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver()
{
    // newGameBtn.classList.add("active");
    let answer="";
    winningPositions.forEach((position)=>{
        //all 3 boxes be non-empty and exactly same in value
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
             && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]))
        {
             //check if winner is X
            if(gameGrid[position[0]]==="X")
                answer="X";
            else
                answer="O";
            //dissable pointer events
            boxes.forEach((box)=>
            {
                box.style.pointerEvents="none";
            });
            // now we know x/o is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
             
        }
    });
    // it means we have a winner
    if(answer !=="")
    {
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // lets check when match is tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box !=="")
        {
            fillCount++;
        }
    });
    //board is filled ,game is tied
    if(fillCount===9)
    {
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }



}
// // 
newGameBtn.addEventListener("click",initGame);