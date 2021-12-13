window.onload = (e) => {
  loadEvent();
};

let loadEvent = () => {
  console.log("load");
  fetchData();
  currentTime();
  dayForecast();
};

let fetchData = () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=patna&units=metric&appid=3b290be9028803139668a0e0e2877847"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayData(data);
    })
    .catch((error) => console.log("Error =>", error));
};

let displayData = (data) => {
  var nam = document.querySelector("#nm");
  var deg = document.querySelector(".deg .cur span");
  var max = document.querySelector(".max");
  var min = document.querySelector(".min");
  var desc = document.querySelector(".description .desc");
  var humidity = document.querySelector(".description .feel i");
  var wind = document.querySelector(".description .wind i");
  nam.innerText = `${data.name}`;
  deg.innerText = `${data.main.temp}°C`;
  max.innerText = `max.${data.main.temp_max}°C`;
  min.innerText = `min.${data.main.temp_min}°C`;
  desc.innerText = `${data.weather[0].description}`;
  humidity.innerText = `${data.main.humidity}`;
  wind.innerText = `${data.wind.speed}Km/h`;
};

let currentTime = () => {
  var time = document.querySelector(".current-date");
  const d = new Date();
  time.innerText = d.toDateString();
};

let dayForecast = () => {
  console.log("day Forecast");
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=25.6&lon=85.1167&exclude=current,minutely,hourly,alerts&units=metric&appid=3b290be9028803139668a0e0e2877847"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayForecast(data);
    })
    .catch((error) => console.log("Error =>", error));
};

let displayForecast = (data) => {
  for (let i = 0; i < data.daily.length; i++) {
    var div = document.createElement("div");
    div.setAttribute("class", "forecast");
    var dayname = new Date(data.daily[i].dt * 1000).toLocaleDateString("en", {
      weekday: "long",
    });
    var icon = data.daily[i].weather[0].icon;
    var temp = data.daily[i].temp.day.toFixed(0);

    let dayForecast = document.querySelector(".day-forecast");

    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("span");

    span1.setAttribute("class", "dayname");
    span2.setAttribute("class", `ico-${icon}`);
    span2.setAttribute("title", `${icon}`);

    span1.innerText = `${dayname}`;
    span3.innerHTML = `${temp}°C`;

    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(span3);
    dayForecast.appendChild(div);
  }
};
