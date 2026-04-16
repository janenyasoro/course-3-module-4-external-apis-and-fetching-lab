// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("fetch-button");

  if (button === null) {
    return;
  }

  button.addEventListener("click", function () {
    const input = document.getElementById("state-input");
    const display = document.getElementById("alerts-display");
    const error = document.getElementById("error-message");

    const state = input.value;
    input.value = "";

    fetch(weatherApi + state)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network failure");
        }
        return response.json();
      })
      .then(function (data) {
        error.textContent = "";
        error.classList.add("hidden");

        let text = "Weather Alerts: " + data.features.length;

        for (let i = 0; i < data.features.length; i++) {
          text += " " + data.features[i].properties.headline;
        }

        display.textContent = text;
      })
      .catch(function (err) {
        error.textContent = err.message;
        error.classList.remove("hidden");
        display.textContent = "";
      });
  });
});
