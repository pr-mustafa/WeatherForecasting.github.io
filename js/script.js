var weathers = []
var inputSearch = document.querySelector('#input-search');
async function displayWeathers(value) {
  var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3b7918e7e64e4b85b14151456241604&q=${value}&days=7`);
  var finalResponse = await response.json();
  var contentText = "";
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  var dateObject = new Date(finalResponse.forecast.forecastday[0].date);
  var dayOfWeek = dateObject.getDay();
  var month = dateObject.getMonth();
  contentText += `
    <div class="col-lg-4 py-5">
    <div>
      <div class="d-flex justify-content-between align-items-center text-white rounded-top-4" id="card">
      <p class="pt-3 ps-2">${daysOfWeek[dayOfWeek]}</p>
       <p  class="pt-3 pe-2">${dateObject.getDate()} ${monthNames[month]}</p>
      </div>
      <div id="card-two" class="rounded-bottom-3">
        <p class="text-white ps-4 pt-3 fs-1">${finalResponse.location.name}</p>
        <div class="d-flex justify-content-between align-items-center text-white">
          <h1 class="ps-4 fw-bolder display-4">${finalResponse.current.temp_c}<sup>o</sup>C</h1>
          <img src="https://${finalResponse.current.condition.icon}" alt="" height="90px"/>
         </div>
         <p class="text-info ps-2 text-center fs-5">${finalResponse.current.condition.text}</p>
         <div class="text-white py-5">
          <div class="d-flex justify-content-around align-items-center">
            <div class="">
              <p><i class="fa-solid fa-umbrella fa-2x align-middle pe-1"></i> <span>${finalResponse.current.cloud}</span></p>
            </div>
            <div class="">
              <p><i class="fa-solid fa-wind fa-2x align-middle pe-1"></i> <span>${finalResponse.current.wind_kph}% km/h</span></p>
            </div>
            <div class="">
              <p><i class="fa-solid fa-compass fa-2x align-middle pe-1"></i> <span>${finalResponse.current.wind_degree}°</span></p>
            </div>
          </div>
         </div>
       </div>
    </div>
  </div>
  <div class="col-lg-4 py-5">
    <div>
      <div class="d-flex justify-content-center text-white rounded-top-4" id="card">
      <p class="pt-3 ps-2 ">${daysOfWeek[dayOfWeek + 1]}</p>
      </div>
      <div id="card-two" class="rounded-bottom-3 pb-3">
        <div class="d-flex flex-column  justify-content-between align-items-center text-white">
          <img src="https://${finalResponse.forecast.forecastday[1].day.condition.icon}" alt="" width="60px" class="pt-3"/>
          <h1 class="ps-2 pt-5">${finalResponse.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h1>
          <p class="ps-2 pb-5">${finalResponse.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</p>
         </div>
         <p id="condition" class="text-info ps-2 text-center pb-5">${finalResponse.forecast.forecastday[1].day.condition.text}</p>
   
       </div>
    </div>
  </div>
  <div class="col-lg-4 py-5">
    <div>
      <div class="d-flex justify-content-center text-white rounded-top-4" id="card">
      <p class="pt-3 ps-2 ">${daysOfWeek[dayOfWeek + 2]}</p>
      </div>
      <div id="card-two" class="rounded-bottom-3 pb-3">
        <div class="d-flex flex-column  justify-content-between align-items-center text-white">
          <img src="https://${finalResponse.forecast.forecastday[2].day.condition.icon}" alt="" width="60px" class="pt-3"/>
          <h1 class="ps-2 pt-5">${finalResponse.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h1>
          <p class="ps-2 pb-5">${finalResponse.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</p>
         </div>
         <p id="condition" class="text-info ps-2 text-center pb-5">${finalResponse.forecast.forecastday[2].day.condition.text}</p>
   
       </div>
    </div>
  </div>
    `
  document.querySelector("#mainContainer").innerHTML = contentText;
}
displayWeathers("Dubai");

async function SearchWeather(value) {

  var response = await fetch(`https://api.weatherapi.com/v1/search.json?key=3b7918e7e64e4b85b14151456241604&q=${value}`);
  var finalResponse = await response.json();
  if(finalResponse[0].name){
     displayWeathers(finalResponse[0].name);
  }
 
}

inputSearch.addEventListener("input", function () {
  var value = inputSearch.value;
  if (value.length > 3) {
    SearchWeather(value);
  }
}
)
