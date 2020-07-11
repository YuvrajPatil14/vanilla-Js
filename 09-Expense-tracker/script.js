const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const t = document.getElementById("whenNull");
// const dummyTx = [
//   {
//     id: 1,
//     text: "Florwer",
//     amount: -20,
//   },
//   {
//     id: 2,
//     text: "Salary",
//     amount: 1000,
//   },
//   {
//     id: 3,
//     text: "Book",
//     amount: -10,
//   },
//   {
//     id: 4,
//     text: "camera",
//     amount: -250,
//   },
// ];

const localStorageTx = JSON.parse(localStorage.getItem("transactions"));
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTx : [];

// add tx
function addTx(e) {
  e.preventDefault();
  // console.log(text.value, amount.value);
  t.innerText = "";
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Enter data");
  } else {
    const tx = {
      id: transactions.length + 1,
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(tx);
    updateValues();
    addTxtoDom(tx);
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

//add tx to dom

function addTxtoDom(tx) {
  const sign = tx.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  item.classList.add(tx.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${tx.text}<span>${sign}${Math.abs(tx.amount)}</span>
    <button class='delete-btn'  
    onclick="removeTransaction(${tx.id})">X</button>`;

  list.appendChild(item);
}

//update balance income and expense

function updateValues() {
  const amounts = transactions.map((tx) => tx.amount);
  //console.log(amounts);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2) * -1;
  // console.log(income, expense);
  balance.innerHTML = "$" + total;
  money_minus.innerText = "$" + expense;
  money_plus.innerText = "$" + income;
}

// del tx
function removeTransaction(id) {
  transactions = transactions.filter((tx) => tx.id !== id);
  init();
  updateLocalStorage();
}

//update local store

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
//Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTxtoDom);
  if (transactions.length === 0) {
    t.innerText = "Start Adding Transactions";
  }
  updateValues();
}
init();

//add new item
form.addEventListener("submit", addTx);
