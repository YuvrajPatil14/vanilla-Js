const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let rec = new window.SpeechRecognition();

rec.start();

//capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}
//<div>Go higher</div>
function writeMessage(msg) {
  msgEl.innerHTML = `<div>You said:</div>
<span class="box">${msg}</span>`;
}

//
function checkNumber(msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
    return;
  }
  //check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats you have guessed the number<br><br>
        It was ${num}</h2>
        <button class='play-again' id='play-again'>Play again</button>
      `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>Go Lower</div>`;
  } else {
    msgEl.innerHTML += `<div>Go higher</div>`;
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//speak result
rec.addEventListener("result", onSpeak);

//end sr service
rec.addEventListener("end", () => rec.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
