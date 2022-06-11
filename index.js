// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true
let lastChance = true
let timer

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const autoBtn = document.getElementById("autoBtn")

function showResetButton() {
    rollBtn.style.display = "none"
    autoBtn.style.display = "none"
    resetBtn.style.display = "block"
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    rollDice()
})

autoBtn.addEventListener("click", function() {
    timer = setInterval(rollDice, 1000)
})
 
resetBtn.addEventListener("click", function(){
    reset()
})

function rollDice() {
    const randomNumber = Math.floor(Math.random() * 6) + 1

    if (player1Turn) {
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    } 
    if (player1Score >= 20 && lastChance) {
        message.textContent = "Player 2 last chance!"
        lastChance = false
        autoBtn.style.display = "none"
        rollBtn.style.boxShadow = "0 0 10px rgba(201, 58, 58)"
        clearInterval(timer)
    } else if (player1Score > player2Score && !lastChance)  {
        message.textContent = "Player 1 Won 🥳"
        showResetButton()
        clearInterval(timer)
    } else if (player1Score < player2Score && !lastChance) {
        message.textContent = "Player 2 Won 🎉"
        showResetButton()
        clearInterval(timer)  
    } else if (player1Score === player2Score && !lastChance) {
        message.textContent = "Tie"
        showResetButton()
        clearInterval(timer)
    } else if (player2Score >= 20) {
        message.textContent = "Player 2 Won 🎉"
        showResetButton()
        clearInterval(timer)
    }
    player1Turn = !player1Turn
}



function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    lastChance = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    autoBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    rollBtn.style.boxShadow = "none
}
