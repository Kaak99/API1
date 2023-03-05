//  .......  tests à retirer  ........ //
console.log(` --------> app.js`);
/*consoleAPI : https://open-meteo.com/en/docs#api-documentation */
/*     `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m` */
//  .......  const  ........ //

//const CLEAPI = `78a1922f1705234d07f49c9ba55e7602`;
let getAPI = "";
const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const WEATHERCODETABLE = {
  0: "Ciel clair",
  1: "Plutôt dégagé",
  2: "Partiellement nuageux",
  3: "Couvert",
  45: "Brouillard",
  48: "Dépot de brouillard givrant",
  51: "Bruine légère",
  53: "Bruine modérée",
  55: "Bruine intense",
  56: "Bruine verglaçante légère",
  57: "Bruine verglaçante intense",
  61: "Pluie légère",
  63: "Pluie modérée",
  65: "Pluie forte",
  66: "Pluie verglaçante légère",
  67: "Pluie verglaçante intense",
  71: "Chute de neige légère",
  73: "Chute de neige modérée",
  75: "Chute de neige intense",
  77: "Grains de neige",
  80: "Averses(pluie)légères",
  81: "Averses(pluie)modérées",
  82: "Averses(pluie)violentes",
  85: "Averses de neige légères",
  86: "Averses de neige intenses",
  95: "Orage",
  96: "Orage + grêle légère",
  99: "Orage + grêle forte",
};
//const aHTML = document.querySelector('.class');
//aHTML.innerHTML = `   `

//  .......  code  ........ //

//pas pareil, ne se relance pas à chaque fois?
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition((laPosition) => {
//     console.log(laPosition);
//   });
// } else {
//   alert("vous n'avez pas autorisé la géolocalisation");
// }

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (laPosition) => {
      //console.log(laPosition);
      let long = laPosition.coords.longitude;
      let lat = laPosition.coords.latitude;
      appelAPI(long, lat);
    },
    () => {
      alert("vous n'avez pas autorisé la géolocalisation");
    }
  );
}

//  .......  fonctions  ........ //

//afficher warning
function appelAPI(long, lat) {
  console.log(long);
  console.log(lat);
  //console.log(` ${a} ${b} `);
  // fetch(
  //   `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely&lang=fr&units=metric&appid=${CLEAPI}`
  // )
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,cloudcover,visibility,windspeed_10m,winddirection_10m,windgusts_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=auto`
  )
    .then((reponse) => {
      console.log(reponse);
      return reponse.json();
    })
    .then((data) => {
      getAPI = data;
      console.log(getAPI);
      console.log(
        "lat=",
        getAPI.latitude,
        "long=",
        getAPI.longitude,
        "elevation=",
        getAPI.elevation
      );

      console.log(
        "timezone",
        getAPI.timezone,
        "timezone-abbrev",
        getAPI.timezone_abbreviation
      );
      console.log("hourly", getAPI.hourly, "hourly_units", getAPI.hourly_units);
      console.log("current_weather", getAPI.current_weather);

      let weathercode = getAPI.current_weather.weathercode;
      temps.innerText = WEATHERCODETABLE[weathercode];
      temperature.innerText =
        Math.trunc(getAPI.current_weather.temperature) + " °";

      localisation.textContent = getAPI.timezone;
    });
}

/*
https://open--meteo-com.translate.goog/en/docs?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp

En cas de succès, un objet JSON sera renvoyé.

{
  "latitude": 52.52,
  "longitude": 13.419,
  "elevation": 44.812,
  "generationtime_ms": 2.2119,
  "utc_offset_seconds": 0,
  "timezone": "Europe/Berlin",
  "timezone_abbreviation": "CEST",
  "hourly": {
    "time": ["2022-07-01T00:00", "2022-07-01T01:00", "2022-07-01T02:00", ...],
    "temperature_2m": [13, 12.7, 12.7, 12.5, 12.5, 12.8, 13, 12.9, 13.3, ...]
  },
  "hourly_units": {
    "temperature_2m": "°C"
  },
  "current_weather": {
    "time": "2022-07-01T09:00",
    "temperature": 13.3,
    "weathercode": 3,
    "windspeed": 10.3,
    "winddirection": 262
  }
}

*/
