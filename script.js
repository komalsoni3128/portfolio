console.log("javascript connected");
const themeButton = document.getElementById("themeToggle");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Switch to Light Mode";
    } else {
        themeButton.textContent = "Switch to Dark Mode";
    }

});
const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");
weatherButton.addEventListener("click", getWeather);
async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) {
        weatherResult.textContent = "Please enter a city.";
        return;
    }

    weatherResult.textContent = "Loading weather...";

    const apiKey = "c40b566ab6d1f5caf4416369012850e9";

    const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        weatherResult.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;

    } catch (error) {

        weatherResult.textContent =
            "Unable to fetch weather. Please try again.";

        console.error(error);
    }
}
weatherButton.addEventListener("click", getWeather);

const projectSearch = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");
const projectSearchStatus = document.getElementById("projectSearchStatus");

function filterProjects() {
    const term = projectSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(function (card) {
        const haystack = card.textContent.toLowerCase();
        const matches = term === "" || haystack.includes(term);
        card.hidden = !matches;
        if (matches) {
            visibleCount += 1;
        }
    });

    if (term === "") {
        projectSearchStatus.textContent = "";
    } else if (visibleCount === 0) {
        projectSearchStatus.textContent = "No projects match that search.";
    } else {
        projectSearchStatus.textContent = visibleCount + " project(s) found.";
    }
}

if (projectSearch) {
    projectSearch.addEventListener("input", filterProjects);
}