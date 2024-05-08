const time = document.querySelector("#timer")
const score1 = document.querySelector("#score1")
const score2 = document.querySelector("#score2")
const cards = document.querySelectorAll(".cards")

let imgElements = document.getElementsByClassName("cards")
let imgElementsArray = [...imgElements] // for shuffling

const player1 = localStorage.getItem("player1")
console.log(`player 1 => ${player1}`)

const player2 = localStorage.getItem("player2")
console.log(`player 2 => ${player2}`)

const player1Name = document.getElementById("playerName1")
const player2Name = document.getElementById("playerName2")

let seconds = 0
let timer
let isGameActive = false
let endTimerMessage = "Time is Up."

let score = 0
let player1Score = 0
let player2Score = 0
let playerTurn = 1

let winningScore = 5
let attempts = 0

let flippedCard = false
let firstCard, secondCard // to choose first then seconed card to see matching cards
let lockBoard = false // set to false so when the player click the seconed card it turnes to true

const displayMessage = (message) => {
  // Show message here. You can use an alert box for example.
  alert("Game Over")
}

const startTimer = () => {
  isGameActive = true
  timer = setInterval(() => {
    seconds++
    time.innerText = `${seconds} sec`
    checkTimer()
    winTime()
    winnerPlayer()
  }, 1000)
}

const checkTimer = () => {
  if (seconds === 60) {
    console.log("stopping timer")
    clearInterval(timer)
    gameEnds()
    displayMessage(endTimerMessage)
    playAudio()
  }
}

const winTime = () => {
  if (seconds < 60) {
    console.log("stopping timer")
    isGameActive = true
    winnerPlayer()
  }
}

const gameEnds = () => {
  isGameActive = false
  console.log("Game Over")
}

const winnerPlayer = (winner) => {
  if (winner === winningScore) {
    clearInterval()
    console.log(`Congratulations! you win the round`)
  }
}

// game over text & audio (cheak later)

const playAudio = () => {
  console.log("Playing audio...")
  let myAudio = document.getElementById("myAudio")
  myAudio.play()
}

const winAudio = () => {
  console.log("cong audio...")
  let winAudio = document.getElementById("winAudio")
  winAudio.play()
}

// flipping cards
const flipCardsListeners = () => {
  cards.forEach((card) => {
    card.addEventListener("click", flipCard)
  })
}

const matchLogic = (card) => {
  // Is this the first card?
  if (!firstCard) {
    firstCard = card
  } else {
    secondCard = card
    checkForMatch()
  }
}

const showNames = () => {
  // TODO Fix this
  player1Name.innerHTML = `${player1}: `
  player2Name.innerHTML = `${player2}: `
}

const flipCard = (event) => {
  console.log(event.target)
  if (isGameActive) {
    event.target.parentElement.classList.toggle("flip")
    matchLogic(event.target)
  }
}

const checkForMatch = () => {
  console.log(`framework 1 => ${firstCard.dataset.framework}`)
  console.log(`framework 2 => ${secondCard.dataset.framework}`)
  if (
    firstCard.parentElement.dataset.framework ===
    secondCard.parentElement.dataset.framework
  ) {
    console.log("match!")
    // hideCards()
    disableCards() // if there is matching
    updateScoreBoard()
    checkForWinner()
  } else {
    console.log("HERE I AM!")
    unflipCards() // turns both back if there is no matching
  }
  switchPlayer()
}

const checkForWinner = () => {
  // Check if all cards have been flipped
  if (disableCards === flipCardsListeners) {
    console.log("all cards are flipped")
  }
  // Who has the higher score
  else if (player1Score > player2Score) {
    console.log("player 1 win")
  } else if (player2Score > player1Score) {
    console.log("player 2 win")
  } else {
    onsole.log("we have a tie")
  }
  // Stop timer
  let timer = setInterval(function () {}, 1000)

  if (winnerDeclared) {
    clearInterval(timer)
  }
  // Announce winner
  const alertMessage = (winning) => {
    // Show message here. You can use an alert box for example.
    alert(`congragulation ${winnerPlayer} is the winner `)
  }
}

const disableCards = () => {
  // add event listener to check for match
  firstCard.parentElement.removeEventListener("click", flipCard)
  secondCard.parentElement.removeEventListener("click", flipCard)
  firstCard = ""
  secondCard = ""
}

const unflipCards = () => {
  setTimeout(() => {
    firstCard.parentElement.classList.remove("flip")
    secondCard.parentElement.classList.remove("flip")
    firstCard = ""
    secondCard = ""
  }, 1000)
}

const switchPlayer = () => {
  if (playerTurn === 1) {
    playerTurn = 2
    console.log("player2")
  } else {
    playerTurn = 1
    console.log("player1")
  }
}

const updateScoreBoard = () => {
  if (playerTurn === 1) {
    player1Score += 5
    // Use DOM manipulation to update the content of the score element
    score1.innerHTML = player1Score
  } else {
    player2Score += 5
    score2.innerHTML = player2Score
  }
}

// to shuffle the cards every time the game start

function shuffle() {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12)
    card.style.order = ramdomPos
  })
}

const startGame = () => {
  startTimer()
  showNames()
  flipCardsListeners()

  shuffle()
}
startGame()
