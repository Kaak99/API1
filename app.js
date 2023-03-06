//  .......  tests à retirer  ........ //
console.log(` --------> app.js`);

//  .......  IMPORT  ........ //

import tabJoursEnOrdre from "./modules/gestionTemps.js";
//console.log("semaine from app.js:", tabJoursEnOrdre);

// .......... CONSTANTES ..........  //

const WEATHERsvgTABLE = {
  0: "clair.svg",
  1: "solnuag.svg",
  2: "solnuag.svg",
  3: "nuages.svg",
  45: "nuages.svg",
  48: "nuages.svg",
  51: "pluiefine.svg",
  53: "pluiefine.svg",
  55: "pluieforte",
  56: "pluiefine.svg",
  57: "pluieforte.svg",
  61: "pluiefine.svg",
  63: "pluieforte.svg",
  65: "pluiefine.svg",
  66: "pluiefine.svg",
  67: "pluieforte.svg",
  71: "neige.svg",
  73: "neige.svg",
  75: "neige.svg",
  77: "neige.svg",
  80: "pluiefine.svg",
  81: "pluieforte.svg",
  82: "pluieforte.svg",
  85: "neige.svg",
  86: "neige.svg",
  95: "orage.svg",
  96: "orage.svg",
  99: "orage.svg",
};
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
  80: "Averses légères",
  81: "Averses modérées",
  82: "Averses violentes",
  85: "Averses de neige légères",
  86: "Averses de neige intenses",
  95: "Orage",
  96: "Orage + grêle légère",
  99: "Orage + grêle forte",
};

const zone = document.querySelector(".zone");
// const localisation = document.querySelector(".localisation");
const tempsCode = document.querySelector(".tempsCode");
const temperature = document.querySelector(".temperature");
const vitesseVent = document.querySelector(".vitesseVent");

const probaPluie = document.querySelector(".probaPluie");
const indexUV = document.querySelector(".indexUV");
const leverCoucher = document.querySelector(".leverCoucher");

const heure = document.querySelectorAll(".heure-nom-prevision");
const tempsPourHeure = document.querySelectorAll(".heure-prevision-valeur");
const joursDiv = document.querySelectorAll(".jour-prevision-nom");
const codeJoursDiv = document.querySelectorAll(".jour-prevision-code");
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp");
const pluieJoursDiv = document.querySelectorAll(".jour-prevision-pluie");
const ventJoursDiv = document.querySelectorAll(".jour-prevision-vent");
const imageIcon = document.querySelector(".logo-meteo");
const chargementContainer = document.querySelector(".overlay-icone-chargement");

let getAPI = ""; //résultat requete API
let leWeathercode = 0; //contiendra code du temps(weather) actuel (weathercode)
let heureActuelle = ""; //contiendra heure en cours
let leverSoleil;
let coucherSoleil;

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

function appelAPI(long, lat) {
  console.log("long=", long, " || lat=", lat);

  const urlAPI = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,visibility,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=auto`;

  //bien vérifier &current_weather=true&timezone=auto

  fetch(urlAPI)
    .then((reponse) => {
      //console.log(reponse);
      return reponse.json();
    })
    .then((data) => {
      getAPI = data;
      // console.log(getAPI);
      // console.log("hourly", getAPI.hourly, "hourly_units", getAPI.hourly_units);
      // console.log("current_weather", getAPI.current_weather);
      // console.log("daily", getAPI.daily);

      //affiche temp actuel
      //(timezone+codeweather +temperature+vitesse vent+probaPluie+UV+sunrise/sunset)
      zone.textContent = getAPI.timezone;

      leWeathercode = getAPI.current_weather.weathercode;
      console.log("leWeathercode", leWeathercode);
      tempsCode.innerText = WEATHERCODETABLE[leWeathercode];
      temperature.innerText =
        Math.trunc(getAPI.current_weather.temperature) + " °C";

      vitesseVent.innerText =
        "Vent à " + Math.trunc(getAPI.current_weather.windspeed) + " km/h";
      probaPluie.innerText =
        "Probabilité Pluie " +
        Math.trunc(getAPI.daily.precipitation_probability_max[0]) +
        "% max";
      indexUV.innerText = "Index UV : " + getAPI.daily.uv_index_max[0] + " max";
      leverSoleil = getAPI.daily.sunrise[0];
      coucherSoleil = getAPI.daily.sunset[0];
      console.log(
        "leverSoleil=",
        leverSoleil,
        "|coucherSoleil=",
        coucherSoleil
      );
      leverCoucher.innerText =
        "Lever " +
        leverSoleil.slice(12, 16) +
        "☀️Coucher " +
        coucherSoleil.slice(12, 16);

      // on s'occupe des heures
      heureActuelle = new Date().getHours();
      for (let index = 0; index < 6; index++) {
        let heureIncr = heureActuelle + 4 + index * 4;
        if (heureIncr > 24) {
          heure[index].innerText = `${heureIncr - 24} h`;
        } else if (heureIncr == 24) {
          heure[index].innerText = `00 h`;
        } else {
          heure[index].innerText = `${heureIncr} h`;
        }
      }
      for (let index = 0; index < tempsPourHeure.length; index++) {
        tempsPourHeure[index].innerText = `${Math.trunc(
          getAPI.hourly.temperature_2m[index * 4]
        )} °C`;
      }

      // on s'occupe des jours
      //console.log("daily", getAPI.daily);
      for (let index = 0; index < tabJoursEnOrdre.length; index++) {
        joursDiv[index].innerText = tabJoursEnOrdre[index].slice(0, 3);
      } //affiche que 3 1eres lettres des jours

      for (let index = 0; index < codeJoursDiv.length; index++) {
        codeJoursDiv[index].innerText =
          WEATHERCODETABLE[getAPI.daily.weathercode[index]];

        // codeJoursDiv[index].innerText = `${
        //   getAPI.daily.temperature_2m_min[index + 1]
        // }`;
      }
      for (let index = 0; index < tempJoursDiv.length; index++) {
        tempJoursDiv[index].innerText = `${Math.trunc(
          getAPI.daily.temperature_2m_min[index + 1]
        )}-${Math.trunc(getAPI.daily.temperature_2m_max[index + 1])}°C`;
      }
      for (let index = 0; index < pluieJoursDiv.length; index++) {
        pluieJoursDiv[index].innerText = `pluie: ${
          getAPI.daily.precipitation_probability_max[index + 1]
        }%`;
      }
      for (let index = 0; index < ventJoursDiv.length; index++) {
        ventJoursDiv[index].innerText = `vent:${Math.trunc(
          getAPI.daily.windspeed_10m_max[index + 1]
        )}km/h max`;
      }

      //affichage de l'icone du temps selon code et selon jour/nuit
      // console.log("leverSoleil", leverSoleil.slice(11, 13));
      // console.log("coucherSoleil", coucherSoleil.slice(11, 13));
      if (
        heureActuelle > leverSoleil.slice(11, 13) ||
        heureActuelle < coucherSoleil.slice(11, 13)
      ) {
        imageIcon.src = `./ressources/jour/${
          WEATHERsvgTABLE[getAPI.current_weather.weathercode]
        }`;
      } else {
        imageIcon.src = `./ressources/nuit/${
          WEATHERsvgTABLE[getAPI.current_weather.weathercode]
        }`;
      }

      chargementContainer.classList.add("disparition");
    }); //fin du then
}
