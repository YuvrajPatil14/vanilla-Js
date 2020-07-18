//https://jsonplaceholder.typicode.com/posts?_limit=3

const postContainer = document.getElementById("posts-container");
const loader = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

//fetch post from api
async function getPost() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await response.json();
  return data;
}

//show posts in dom

async function showPost() {
  const posts = await getPost();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">
        ${post.body}
        </p>
      </div>`;
    postContainer.appendChild(postEl);
  });
}

//Show loader and fetch more
function showLoading() {
  loader.classList.add("show");

  setTimeout(() => {
    loader.classList.remove("show");
    setTimeout(() => {
      page++;
      showPost();
    }, 300);
  }, 1200);
}
//Filter post
function filterPosts(e) {
  // console.log("ca");
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  // console.log(term, posts);
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

//first call
showPost();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
