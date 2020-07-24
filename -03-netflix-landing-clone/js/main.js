const tabItems = document.querySelectorAll(".tab-item");
const tabContentItems = document.querySelectorAll(".tab-content-item");

//select tab
function selectItem() {
  //Add border to current tab
  removeBorder();
  removeShow();
  removeSelected();
  this.classList.add("tab-border");
  this.classList.add("selected");
  //Grab content item from dom
  const tabContentItem = document.querySelector(`#${this.id}-content`);

  //Add show
  tabContentItem.classList.add("show");
}

function removeBorder() {
  tabItems.forEach((item) => item.classList.remove("tab-border"));
}
function removeSelected() {
  tabItems.forEach((item) => item.classList.remove("selected"));
}
function removeShow() {
  tabContentItems.forEach((item) => item.classList.remove("show"));
}
tabItems.forEach((item) => item.addEventListener("click", selectItem));
