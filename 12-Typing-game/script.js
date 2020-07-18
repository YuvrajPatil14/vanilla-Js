const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

//Init word

let randomWord;

//init score
let score = 0;

//Init time
let time = 10;

//get value for difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
//Set select value

difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
//Focus on text on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

//generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Add word to DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

addWordToDom();

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//Update time

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //endGame
    gameOver();
  }
}
//Game over show end screen
function gameOver() {
  endgameEl.innerHTML = `<h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onClick='location.reload()'>Reload</button>`;

  endgameEl.style.display = "flex";
}
//Event listner

//Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  console.log(insertedText);

  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();
    e.target.value = "";
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

//settings button
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

//setting select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
