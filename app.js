/* Imports */

var UI = require('ui');
var Accel = require('ui/accel');
var Vector2 = require('vector2');
var Ajax = require('ajax');


/* Declaring vars */

var BOX_ONE_WIDTH = 144;
var BOX_TWO_WIDTH = 144;
var BOX_ONE_HEIGHT = 112;
var BOX_TWO_HEIGHT = 56;
var SHOW_DEGREES = true;
var API_URL = 'http://api.openweathermap.org/data/2.5/weather?';

var GEO_OPTS = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};

/* Declaring UI */

var uiWindow = new UI.Window({
  fullscreen: true
});

/* BOX ONE */

var boxOne = new UI.Rect({
  position: new Vector2(0, 0),
  size: new Vector2(BOX_ONE_WIDTH, BOX_ONE_HEIGHT),
  backgroundColor: 'vividCerulean'
});

var uiTimeString = new UI.TimeText({
  position: new Vector2(0, 20),
  size: new Vector2(BOX_ONE_WIDTH, 30),
  text: "%H:%M",
  font: 'bitham-42-bold',
  color: 'darkCandyAppleRed',
  textAlign: 'center'
});

var uiDayString = new UI.TimeText({
  position: new Vector2(0, 65),
  size: new Vector2(BOX_ONE_WIDTH, 30),
  text: "%a %d %b",
  font: 'gothic-24-bold',
  color: 'darkCandyAppleRed',
  textAlign: 'center'
});


/* BOX TWO */

var boxTwo = new UI.Rect({
  position: new Vector2(0, BOX_ONE_HEIGHT),
  size: new Vector2(BOX_TWO_WIDTH, BOX_TWO_HEIGHT),
  backgroundColor: 'white'
});

var uiWeatherString = new UI.TimeText({
  position: new Vector2(0, 122),
  size: new Vector2(BOX_ONE_WIDTH, 30),
  text: "",
  font: 'gothic-24-bold',
  color: 'darkCandyAppleRed',
  textAlign: 'center'
});

function getMeteo(){
   
  Ajax(
      {
        url: API_URL, 
        type: 'json'
      },
      function(json) {
        if(SHOW_DEGREES){
          uiWeatherString.text(json.main.temp+"°");
          SHOW_DEGREES = false;
        } else {
          uiWeatherString.text(json.weather[0].description);
          SHOW_DEGREES = true;
        }
        
      },
      function(error) {
        uiWeatherString.text("???");
      }
  );
    
}

/* Geolocation query */

function locationSuccess(pos) {
  API_URL = API_URL+'lat='+pos.coords.latitude+'&lon='+pos.coords.longitude+'&units=metric';
  getMeteo();
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}


navigator.geolocation.getCurrentPosition(locationSuccess, locationError, GEO_OPTS);

/* Building UI */

uiWindow.add(boxOne);
uiWindow.add(boxTwo);
uiWindow.add(uiTimeString);
uiWindow.add(uiDayString);
uiWindow.add(uiWeatherString);
uiWindow.show();

/* Adding event listeners */

Accel.peek(function(e) {
  getMeteo();
});

Accel.on('tap', function(e) {
   getMeteo();
});

uiWindow.on('accelTap', function(e) {
  getMeteo();
});

uiWindow.on('accelTap', function(e) {
  getMeteo();
});

uiWindow.on('click','select',function(){
  getMeteo();
});