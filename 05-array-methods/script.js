const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMill = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateBtn = document.getElementById("calculate-wealth");

let data = [];

//fetch random user and add money
getRandomUser();
getRandomUser();
getRandomUser();
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100000),
  };
  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDom();
}

function updateDom(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong> ${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  data = data.map((item) => {
    return {
      ...item,
      money: item.money * 2,
    };
  });
  updateDom();
}
function sortUsers() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}
function filterMill() {
  const mill = data.filter((item) => (item.money > 100000 ? item : null));
  updateDom(mill);
}

function reduceAll() {
  const total = data.reduce((acc, user) => (acc += user.money), 0);

  const wealth = document.createElement("div");
  wealth.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;

  main.append(wealth);
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortUsers);
showMill.addEventListener("click", filterMill);
calculateBtn.addEventListener("click", reduceAll);
