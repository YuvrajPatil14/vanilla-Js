const currencyElem_one = document.getElementById("currency-one");
const currencyElem_two = document.getElementById("currency-two");
const amountElem_two = document.getElementById("amount-two");
const amountElem_one = document.getElementById("amount-one");
const rateElem = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const currency_one = currencyElem_one.value;
  const currency_two = currencyElem_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.rates);

      const rate = data.rates[currency_two];
      //console.log(rate);
      rateElem.innerText = ` 1 ${currency_one} = ${rate} ${currency_two}`;
      amountElem_two.value = (amountElem_one.value * rate).toFixed(2);
    });
}

//event listeners

currencyElem_one.addEventListener("change", calculate);
amountElem_one.addEventListener("input", calculate);
currencyElem_two.addEventListener("change", calculate);
amountElem_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyElem_one.value;
  currencyElem_one.value = currencyElem_two.value;
  currencyElem_two.value = temp;
  calculate();
});
calculate();
