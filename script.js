const apikey = "C2JLTNPCTCZXPSVYHCYYSUTM8";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkwheater(city) {
  const apiurl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apikey}&contentType=json`;
  try {
    const response = await fetch(apiurl);
    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.address;
    document.querySelector(".temp").innerHTML =
      Math.round(data.currentConditions.temp) + "°c";
    document.querySelector(".humidity").innerHTML =
      data.currentConditions.humidity + "%";
    document.querySelector(".wind").innerHTML =
      data.currentConditions.windspeed + "Km/h";

    const currentCondition = data.currentConditions.conditions.toLowerCase();
    if (currentCondition.includes("clear")) {
      weatherIcon.src = "images/clear.png";
    } else if (
      currentCondition.includes("rain") ||
      currentCondition.includes("drizzle")
    ) {
      weatherIcon.src = "images/rain.png";
    } else if (
      currentCondition.includes("cloud") ||
      currentCondition.includes("overcast")
    ) {
      weatherIcon.src = "images/clouds.png";
    } else if (currentCondition.includes("snow")) {
      weatherIcon.src = "images/snow.png";
    } else {
      weatherIcon.src = "images/clear.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Something is wrong", error);
  }
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim() !== "") {
    checkwheater(searchBox.value);
  }
});
searchBox.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && searchBox.value.trim() != "") {
    checkwheater(searchBox.value);
  }
});

// checkwheater("Kolkata");
