const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("music");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

//song title
const songs = ["hey", "summer", "ukulele"];

//keep track of song
let songIndex = 1;

//initially load song

loadSong(songs[songIndex]);

//update song details

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}
//play Song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}
//pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}
//Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//nxt song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPer = (currentTime / duration) * 100;
  progress.style.width = `${progressPer}%`;
}

//set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//Event listner

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//time song update

audio.addEventListener("timeupdate", updateProgress);

//Click on progress bar

progressContainer.addEventListener("click", setProgress);

//song ends
audio.addEventListener("ended", nextSong);
