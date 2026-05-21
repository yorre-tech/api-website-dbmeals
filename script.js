let url = "https://www.themealdb.com/api/json/v1/1/search.php?s";

const div = document.getElementById("meals");

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

function toonData(mealData) {
    mealData.meals.forEach(element => {
        food = element.strMeal;
        category = element.strCategory;
        country = element.strCountry;
        image = element.strMealThumb;

        let divEl = document.createElement("div");
        let foodEl = document.createElement("p");
        let categoryEl = document.createElement("p");
        let countryEl = document.createElement("p");
        let imageEl = document.createElement("img");

        foodEl.textContent = food;
        categoryEl.textContent = category;
        countryEl.textContent = country;
        imageEl.src = image;
        imageEl.alt = food + "name";

        foodEl.classList.add("meal");
        categoryEl.classList.add("meal");
        countryEl.classList.add("meal");
        imageEl.classList.add("image");

        divEl.appendChild(foodEl);
        divEl.appendChild(categoryEl);
        divEl.appendChild(countryEl);
        divEl.appendChild(imageEl);
        div.appendChild(divEl);
        
        foodCount.push(food);
    });
    for (let i = 0; i < foodCount.length; i++) {
        console.log(foodCount[i] + " meal nummer " + (i + 1));
    }
}

getMeals();