const apikey = "999ea1f6b1ea767b8108ee855436d4af";
const minMax = document.querySelector(".minMax");
const iconDescript = document.querySelector(".icon");
const detail = document.querySelector(".details");
const temp = document.querySelector(".temperature");
var cityInputData = document.getElementById("inputData");


cityInputData.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    event.preventDefault();
    var valueEntered = cityInputData.value;
    getData(valueEntered);
    cityInputData.value = "";
  }
});

async function getData(valueE) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${valueE}&appid=${apikey}&units=metric`
    );

    const serverData = await response.json();

    const minTemp = Math.round(serverData.main.temp_min);
    const maxTemp = Math.round(serverData.main.temp_max);
    const temperature = Math.round(serverData.main.temp);
    const description = serverData.weather[0].description;
    const weatherCondition = serverData.weather[0].main.toLowerCase();
    const wind = serverData.wind.speed;
    const humidity = serverData.main.humidity;
    const windDirection = serverData.wind.deg;
    const windDirectionInWords = direction(windDirection);
    descriptionImage(weatherCondition);

    minMax.querySelector(".minTemp").textContent = minTemp;
    minMax.querySelector(".maxTemp").textContent = maxTemp;
    iconDescript.querySelector(".description").textContent = description;
    detail.querySelector(".wind .speedCaption .speed").textContent = wind;
    detail.querySelector(".wind .speedCaption .directionCaption").textContent = windDirectionInWords;
    detail.querySelector(".humid .humidity").textContent = humidity;
    temp.textContent = temperature;

  } catch (error) {
    console.error("Network not fine")
  }
}

function descriptionImage(weatherCondition) {

  const weatherIcon = document.getElementById("weather-icon");

  if (weatherCondition === "clear") {
    weatherIcon.src = "images/sunny.png";
    weatherIcon.alt = "Sunny Weather";
  } else if (weatherCondition === "rainy") {
    weatherIcon.src = "images/rainy-day.png";
    weatherIcon.alt = "Rainy Weather";
  } else if (weatherCondition === "clouds") {
    weatherIcon.src = "images/cloudy.png";
    weatherIcon.alt = "Cloudy Weather";
  }
  else if (weatherCondition === "snow") {
    weatherIcon.src = "images/snow.png";
    weatherIcon.alt = "Snow Weather";
  }
}

function direction(angleDegrees) {
  var rainDirection;

  if (angleDegrees > 337.5 || angleDegrees <= 22.5) {
    rainDirection = "North";
  } else if (angleDegrees > 22.5 && angleDegrees <= 67.5) {
    rainDirection = "Northeast";
  } else if (angleDegrees > 67.5 && angleDegrees <= 112.5) {
    rainDirection = "East";
  } else if (angleDegrees > 112.5 && angleDegrees <= 157.5) {
    rainDirection = "Southeast";
  } else if (angleDegrees > 157.5 && angleDegrees <= 202.5) {
    rainDirection = "South";
  } else if (angleDegrees > 202.5 && angleDegrees <= 247.5) {
    rainDirection = "Southwest";
  } else if (angleDegrees > 247.5 && angleDegrees <= 292.5) {
    rainDirection = "West";
  } else {
    rainDirection = "Northwest";
  }

  return rainDirection;
}
