let find_location = document.querySelector("#search");
let invalid = document.querySelector(".invalid");

let search_location = document.querySelector("input");
let currentLocation = document.querySelector(".currentLocation")
let climateimg = document.querySelector(".climateimg");
let Location = document.querySelector(".Location")
let climate = document.querySelector('.climate');
let windSpeed = document.querySelector(".windSpeed");

console.log(invalid);

currentLocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((location) => {
    let latitude = location.coords.latitude
    let longitude = location.coords.longitude
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2c6823df05f8bb675e7f4e01e7870081`)
      .then(data => data.json())
      .then(data => {
        forcast(data)
        search_location.value = "";
      })
      .catch((error) => console.log(error))

  })
})

find_location.addEventListener("click", () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search_location.value}&appid=2c6823df05f8bb675e7f4e01e7870081`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      if (data.name == undefined) {
  
        Location.innerText = "";
        climate.innerText = "";
        windSpeed.innerText = "";
        climateimg.setAttribute("src", "")
        invalid.style.display = "block"
      }

      else {

        forcast(data)
      }

    })

})

function forcast(data) {
  climateimg.setAttribute("src", `https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`);
  Location.innerText = data.name;
  climate.innerText = data.weather[0].main
  windSpeed.innerText = "wind speed   " + data.wind.speed;
  invalid.style.display = "none"

}