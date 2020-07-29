const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const people = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const listItems = [];

let dragStartIndex;
createList();

//insert list items into dom
function createList() {
  [...people]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragEnter() {
  this.classList.add("over");
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}
function dragOver(e) {
  e.preventDefault();
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}

//swap list items that are draged by user
function swapItems(from, to) {
  const itemOne = listItems[from].querySelector(".draggable");
  const itemTwo = listItems[to].querySelector(".draggable");
  listItems[from].appendChild(itemTwo);
  listItems[to].appendChild(itemOne);
}

//check the order of li
function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector(".draggable").innerText.trim();

    if (personName !== people[index]) {
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
}

function addEventListeners() {
  const drags = document.querySelectorAll(".draggable");
  const dragLi = document.querySelectorAll(".draggable-list li");

  drags.forEach((drag) => {
    drag.addEventListener("dragstart", dragStart);
  });
  dragLi.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
