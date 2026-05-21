let url = "https://www.themealdb.com/api/json/v1/1/search.php?s";

const div = document.getElementById("meals");
const searchInput = document.getElementById("mealsSearch");
const searchButton = document.getElementById("getMeals");

let foodCount = [];

async function getMeals() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if(!response.ok) {
            throw new Error("Network response was not ok");
        }
        toonData(data);

    } catch (error) {
        console.error("Error fetching meals:", error);
        div.textContent = "Er is iets fout met de data. Probeer later opnieuw.";
        div.style.color = "red";
    }
}

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
    div.innerHTML = "";
    foodCount = [];
    getMeals();
});

function toonData(mealData) {
    if (!mealData.meals) {
        div.textContent = "Geen maaltijden gevonden.";
        div.style.color = "black";
        return;
    }
    mealData.meals.forEach(element => {
        food = element.strMeal;
        category = element.strCategory;
        country = element.strCountry;
        image = element.strMealThumb;

        let divEl = document.createElement("div");
        let imageEl = document.createElement("img");
        let infoDownEl = document.createElement("div");
        let infoAboveEl = document.createElement("div");
        let foodEl = document.createElement("span");
        let categoryEl = document.createElement("span");
        let countryEl = document.createElement("span");

        imageEl.src = image;
        imageEl.alt = food;
        foodEl.textContent = food;
        categoryEl.textContent = category;
        countryEl.textContent = country;

        divEl.classList.add("meal-card");
        infoDownEl.classList.add("meal-info-down");
        infoAboveEl.classList.add("meal-info-above");
        foodEl.classList.add("food-info");
        categoryEl.classList.add("category-info");
        countryEl.classList.add("country-info");

        infoAboveEl.appendChild(foodEl);
        infoDownEl.appendChild(categoryEl);
        infoDownEl.appendChild(countryEl);
        divEl.appendChild(imageEl);
        divEl.appendChild(infoAboveEl);
        divEl.appendChild(infoDownEl);
        div.appendChild(divEl);
        
        foodCount.push(food);
    });
    for (let i = 0; i < foodCount.length; i++) {
        console.log(foodCount[i] + " meal nummer " + (i + 1));
    }
}

getMeals();