//create an object to contains elements
const elements = {
    pageOne: document.querySelector('.page--1'),
    pageTwo: document.querySelector('.page--2'),
    gameBoard: document.querySelector('.game-board'),
    newGameBtn: document.getElementById('new-gm-btn'),
    soundBtn: document.getElementById('alter-snd-btn'),
    backSound: document.querySelector('.back-snd'),
    soundState: document.querySelector('#sound-state'),
    restartBtn: document.querySelector('.bi-arrow-repeat'),
    squares: document.querySelectorAll('[data-cell]'),
    playerOne: document.querySelector('.player-1'),
    playerTwo: document.querySelector('.player-2'),
    clickToStr: document.querySelector('.click-to-start'),
    board: document.getElementById('grid'),
    winningMsgTxt: document.querySelector('[data-winning-message-text]'),
    winningMessage: document.querySelector('.winning-message'),
    displayScoreOne: document.querySelector('.display-score-1'),
    displayScoreTwo: document.querySelector('.display-score-2'),
    noSound: document.getElementById('no-sound'),
    thereIsSound: document.getElementById('there-sound')



}
let width = 3;
let score1 = 0;
let score2 = 0;
let currentIndex = 4;
let circleTurn = null
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


//players html
//call this function when the page loaded
init()


function hidePageOne() {
    elements.pageOne.classList.add('hide-pageOne');
}


//events listeners
elements.soundBtn.addEventListener('click', () => {
   if (elements.backSound.paused !== true){
       elements.backSound.pause()
       elements.soundState.textContent = "off"
       elements.thereIsSound.style.display = "none"
       elements.noSound.style.display = "inline-block"

   }
   else if(elements.backSound.paused === true){
       elements.backSound.play()
       elements.soundState.textContent = "on"
       elements.noSound.style.display = "none"
       elements.thereIsSound.style.display = "inline-block"
       
   }
      
})
elements.newGameBtn.addEventListener('click', () => {
    setTimeout(startTheGame, 800)
})
elements.restartBtn.addEventListener('click', () => {
    restart()
    startTheGame()
    init()

})

elements.clickToStr.addEventListener('click', () => {
    elements.clickToStr.classList.add('hide')
    setTimeout(desActivatePlayerTwo, 1000)
})



function init() {
    elements.gameBoard.classList.add('hide-pageOne');
    setTimeout(hidePageOne, 4000)
    elements.backSound.volume = 0.4
    elements.clickToStr.classList.add('hide')
    
}
//Start The game
function startTheGame(){
    circleTurn = false
    elements.clickToStr.classList.remove('hide')
    elements.gameBoard.classList.remove('hide-pageOne');
    elements.squares.forEach(square => {
        square.classList.remove(X_CLASS)
        square.classList.remove(CIRCLE_CLASS)
        square.removeEventListener('click', handleClick)
        square.addEventListener('click', handleClick, {once: true})
        setBoardHoverClass()
    })

}

//rendering players on the board
function handleClick(e) {
    let cell = e.target;
    let currentClass = circleTurn? CIRCLE_CLASS: X_CLASS
    if (currentClass === X_CLASS){
        activatePlayerTwo()
        desActivatePlayerOne()
    }
    else if (currentClass === CIRCLE_CLASS){
        activatePlayerOne()
        desActivatePlayerTwo()
    }
    
    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
       
        endGame(false)
        if (currentClass === X_CLASS){
            score1++
            elements.displayScoreOne.textContent = score1
        }
        else if (currentClass === CIRCLE_CLASS){
            score2++
            elements.displayScoreTwo.textContent = score2
        }
    }
    else if(isDraw()){
        endGame(true)
    }
    else {
        swapTurns()
        setBoardHoverClass()
    }
   
   
}

function endGame(draw){
    if (draw){
        elements.winningMsgTxt.textContent = `Draw! Try again.`
    }
    else{
        elements.winningMsgTxt.textContent = `${circleTurn ? "O's" : "X's"} Wins!`
       
       
        }
        elements.winningMessage.classList.add('show')

    }



function isDraw(){
    return [...elements.squares].every(square => {
        return square.classList.contains(X_CLASS) || square.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    elements.board.classList.remove(X_CLASS)
    elements.board.classList.remove(CIRCLE_CLASS)
    if (circleTurn){
        elements.board.classList.add(CIRCLE_CLASS)
    }
    else {
        elements.board.classList.add(X_CLASS)
    }

}

//Activate and Desactivate Players
function activatePlayerTwo() {
    elements.playerTwo.classList.remove('inactive-player')
}
function desActivatePlayerTwo() {
    elements.playerTwo.classList.add('inactive-player')
}

function activatePlayerOne() {
    elements.playerOne.classList.remove('inactive-player')
}
function desActivatePlayerOne() {
    elements.playerOne.classList.add('inactive-player')
}

//check for wins
function checkWin(currentClass) {
    return WINNING_COMBINATION.some(comb => {
        return comb.every(index => {
            return elements.squares[index].classList.contains(currentClass)
        })
    })
}
//restart the game
function restart() {
    elements.winningMessage.classList.remove('show')
   
    
}




    
    
    
    



