const thermostat = new Thermostat;
updateDisplay('display-temp', thermostat.temperature);
updateDisplay('usage', thermostat.energyUsage());


function updateDisplay(elementId, content) {
  const elements = document.getElementById(elementId);
  elements.textContent = content;
}

//toogle class
function energyUsageColour() {
  if (thermostat.energyUsage() === 'low-usage') {
    document.getElementById('usage').style.color = 'green'
  }
  else if (thermostat.energyUsage() === 'high-usage') {
    document.getElementById('usage').style.color = 'red'
  }
  else if (thermostat.energyUsage() === 'medium-usage') {
    document.getElementById('usage').style.color = 'orange'
  }
}

const upButton = document.getElementById('temperature-up');
upButton.addEventListener('click', function() {
  thermostat.up();
  energyUsageColour()
  updateDisplay('display-temp', thermostat.temperature); 
  updateDisplay('usage', thermostat.energyUsage());
  saveSettings();
});

const downButton = document.getElementById('temperature-down');
downButton.addEventListener('click', function() {
  thermostat.down();
  updateDisplay('display-temp', thermostat.temperature);  
  energyUsageColour()
  updateDisplay('usage', thermostat.energyUsage());
  saveSettings();
});

const resetButton = document.getElementById('temperature-reset');
resetButton.addEventListener('click', function() {
  thermostat.reset();
  energyUsageColour()
  updateDisplay('display-temp', thermostat.temperature); 
  updateDisplay('usage', thermostat.energyUsage());
  saveSettings();
});

const powerSaving = document.getElementById('power-saving');
powerSaving.addEventListener('click', function(){
  if(thermostat.powerSavingModeOn) {
    thermostat.powerSavingModeOn = false;
    powerSaving.style.backgroundColor = "red"
    powerSaving.textContent = "Turn Power Saving Mode On"
  } else {
    thermostat.powerSavingModeOn = true;
    powerSaving.style.backgroundColor = "lightgreen"
    powerSaving.textContent = "Turn Power Saving Mode Off"
  }
  console.log(thermostat.powerSavingModeOn)
  saveSettings();
})

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  const city = document.getElementById('city-name').value.toLowerCase();
  getWeather(city);
  saveSettings();
})

function getWeather(city) {
  const Http = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c8d578d915427955af496a6973fe82c5&units=metric`
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    console.log(Http.response)
    data = JSON.parse(Http.response)
    console.log(data.id)
    updateDisplay('city', city)
    updateDisplay('weather',data.weather[0]['description'])
    updateDisplay('outside-temp',data.main.temp)
  }
}

function getSettings() {
  const Http = new XMLHttpRequest();
  const url = 'http://localhost:9393/temperature'
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    console.log(Http.response)
    data = JSON.parse(Http.response)
    getWeather(data.city)
    thermostat.temperature = data.temperature
    updateDisplay('display-temp',data.temperature)
    thermostat.powerSavingModeOn = data.power
    if (data.power) {
      powerSaving.style.backgroundColor = "lightgreen"
      powerSaving.textContent = "Turn Power Saving Mode Off"
    }
    else {
      powerSaving.style.backgroundColor = "red"
      powerSaving.textContent = "Turn Power Saving Mode On"
    }
  }
}

function saveSettings() {
  const Http = new XMLHttpRequest();
  const url = 'http://localhost:9393/temperature'
  const city = document.getElementById('city').textContent
  const data = {"temperature": thermostat.temperature, "city": city, "power": thermostat.powerSavingModeOn}
  const json = JSON.stringify(data)
  Http.open("POST", url, true);
  Http.send(json);
}

getSettings();

