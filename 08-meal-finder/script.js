const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  result = document.getElementById("result-heading"),
  single = document.getElementById("single-meal");

//function to search meal
function searchMeal(e) {
  e.preventDefault();

  //clear single meal
  single.innerHTML = "";

  //get search
  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        result.innerHTML = `<h2>Search Results for '${term}':</h2>`;
        if (data.meals === null) {
          result.innerHTML = "<p>Nothing found.Try again!!</p>";
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealID="${meal.idMeal}"> 
                    <h3>${meal.strMeal}</h3>
                </div>
                </div>`
            )
            .join("");
        }
      });

    search.value = "";
  } else {
    alert("Please enter some value");
  }
}

//meal by id

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDom(meal);
    });
}
//fetch random meal
function getRandomMeal() {
  //clear meals and heading
  mealsEl.innerHTML = "";
  result.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}

// function add meal to dom

function addMealToDom(meal) {
  const ing = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ing.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  single.innerHTML = `<div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
  <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory} </p>` : ""}
    ${meal.strArea ? `<p>${meal.strArea} </p>` : ""}
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
        ${ing.map((i) => `<li>${i}</li>`).join("")}
    </ul>
    </div>
  </div>`;
}

//evet listener

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealid");
    getMealById(mealId);
  }
});
getRandomMeal();
