const messageContainer = document.querySelector('#message-container')
const message = document.querySelector('#message')

const boxes = document.getElementsByClassName('square')
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', changeColor)
}

let player = 'Red'
let score = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let full = []
let gameover = false

document.querySelector('#reset-button').addEventListener('click', clearBoard)
document.querySelector('#modal-reset').addEventListener('click', clearBoard)

const modal = document.querySelector('#modal')
const modalText = document.querySelector('#modal-textbox > h1')

function openModal () {
    modal.style.display = 'block'
}

function clearBoard () {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = '#615d58'
        boxes[i].textContent = ''
    }
    player = 'Red'
    score = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    full = []
    gameover = false
    modal.style.display = 'none'
    changeMessage()
}

function isTie () {
    if (full.length == 9) {
        modalText.textContent = "It's a Tie!"
        openModal()
    }
}

function changeMessage () {
    messageContainer.style.backgroundColor = player
    message.textContent = `Player ${player}'s Turn`
}

function assignScore () {
    for (let i = 0; i < boxes.length; i++) {
        if (player == 'Red') {
            if (boxes[i].innerHTML == 'played') {
                score[i] = 'Red'
                boxes[i].textContent = 'set'
                console.log(score)
            }
        } else {
            if (boxes[i].innerHTML == 'played') {
                score[i] = 'Blue'
                boxes[i].textContent = 'set'
                console.log(score)
            }
        }
    }
}

function checkScore () {
    if (score[0] == score[1] && score[0] == score[2]) {
        gameover = true
    }
    if (score[0] == score[3] && score[0] == score[6]) {
        gameover = true
    }
    if (score[0] == score[4] && score[0] == score[8]) {
        gameover = true
    }
    if (score[1] == score[4] && score[1] == score[7]) {
        gameover = true
    }
    if (score[2] == score[4] && score[2] == score[6]) {
        gameover = true
    }
    if (score[2] == score[5] && score[2] == score[8]) {
        gameover = true
    }
    if (score[3] == score[4] && score[3] == score[5]) {
        gameover = true
    }
    if (score[6] == score[7] && score[6] == score[8]) {
        gameover = true
    }
}

function changeColor () {
    if (this.textContent == '') {
        this.textContent = 'played'
        this.style.color = player
        this.style.backgroundColor = player
        full.push(0)
        assignScore()
        checkScore()
        isTie()
        if (gameover == false) {
            if (player == 'Red') {
                player = 'Blue'
            } else {
                player = 'Red'
            }
            changeMessage()
        } else {
            modalText.textContent = `Player ${player} Wins!`
            openModal()
        }
    }
}