const continer = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
breathAnimation();
function breathAnimation() {
  text.innerText = "Breath In !";
  continer.className = "container grow";
  setTimeout(() => {
    text.innerText = "Hold !";
    setTimeout(() => {
      text.innerText = "Breath Out !";
      continer.className = "container shrink";
    }, holdTime);
  }, breathTime);
}

setInterval(breathAnimation, totalTime);
