const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

//search

async function searchSong(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

//Show data on DOM
function showData(data) {
  //let output = "";
  //   data.data.forEach((song) => {
  //     output += `
  //         <li>
  //         <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //         <button class='btn' data-artist='${song.artist.name}'
  //         data-songtitle=${song.title}>Get Lyrics</button>
  //         </li>`;
  //   });

  //   result.innerHTML = `
  //   <ul class="songs">
  //   ${output}
  //   </ul>`;
  // console.log(data.data[0].title);
  result.innerHTML = `
  <ul class="songs">
    ${data.data
      .map(
        (song) => `
    <li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class='btn' data-artist='${song.artist.name}'
    data-songtitle='${song.title}'>Get Lyrics</button>
    </li>`
      )
      .join("")}
  </ul>`;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
      `;
  } else {
    more.innerHTML = "";
  }
}

//get prev and next song list
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

//Search for lyrics

async function getLyrics(artist, title) {
  console.log(artist, title);
  const res = await fetch(`${apiURL}/v1/${artist}/${title}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${title}</h2>
  <span>${lyrics}</span>
  `;

  more.innerHTML = "";
}
//Event Listeners

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in search term!!");
  } else {
    searchSong(searchTerm);
  }
  console.log(searchTerm);
});

//get Lyrics

result.addEventListener("click", (e) => {
  const ele = e.target;
  if (ele.tagName === "BUTTON") {
    const artist = ele.getAttribute("data-artist");
    const songtitle = ele.getAttribute("data-songtitle");

    getLyrics(artist, songtitle);
  }
});
