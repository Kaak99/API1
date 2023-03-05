Application meteo

html, css, vanilla js

Utilisation de l'API gratuite https://open-meteo.com/

Rajouter &current_weather=true dans la requete pour avoir accès à la météo du moment ("time","temperature","weathercode","windspeed","winddirection")

Doc : https://open-meteo.com/en/docs

Doc fr (googme translate) :
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

les erreurs :
En cas d'erreur, par exemple un paramètre d'URL n'est pas correctement spécifié, un objet d'erreur JSON est renvoyé avec un code d'état HTTP 400.

{
"error": true,
"reason": "Cannot initialize WeatherVariable from invalid String value tempeture_2m for key hourly"
}

Résumé des parametres (Paramètre Format Description ) :

latitude, Longitude (Point flottant): WGS84 du centre de la cellule de grille météo qui a été utilisée pour générer cette prévision. Cette coordonnée peut être jusqu'à 5 km.

elevation=élévation (Point flottant) : L'altitude d'un modèle d'élévation numérique de 90 mètres.

generationtime_ms (Point flottant) Temps de génération de la prévision météo en millisecondes

utc_offset_seconds (Entier) Décalage de fuseau horaire appliqué à partir du&fuseau horaire=paramètre.

timezone=fuseau horaire, timezone_abbreviation=timezone_abbreviation (Chaîne) Identifiant de fuseau horaire (par exempleEurope/Berlin) et l'abréviation (par exempleCEST)

hourly=toutes les heures (Objet) Pour chaque variable météo sélectionnée, les données seront renvoyées sous forme de tableau à virgule flottante. De plus untempstableau sera renvoyé avec les horodatages ISO8601.

hourly_units=unités_horaires (Objet) Pour chaque variable météo sélectionnée, l'unité sera listée ici.

daily=quotidien (Objet) Pour chaque variable météo quotidienne sélectionnée, les données seront renvoyées sous forme de tableau à virgule flottante. De plus untempstableau sera renvoyé avec les horodatages ISO8601.

daily_units=unités_quotidiennes (Objet) Pour chaque variable météo quotidienne sélectionnée, l'unité sera listée ici.

current_weather=météo actuelle (Objet) Conditions météorologiques actuelles avec les attributs :temps,température,vitesse du vent,direction du ventetcode météo

weathercode :
Codes d'interprétation météorologique de l'OMM (WW)
Code Description
0 Ciel clair
1, 2, 3 Plutôt dégagé, partiellement nuageux et couvert
45, 48 Brouillard et dépôt de brouillard givré
51, 53, 55 Bruine : Intensité légère, modérée et dense
56, 57 Bruine verglaçante : Intensité légère et dense
61, 63, 65 Pluie : Intensité faible, modérée et forte
66, 67 Pluie verglaçante : Intensité légère et forte
71, 73, 75 Chute de neige : Intensité légère, modérée et forte
77 Grains de neige
80, 81, 82 Averses de pluie : Légères, modérées et violentes
85, 86 Averses de neige légères et fortes
95 _ Orage : Léger ou modéré
96, 99 _ Orage avec grêle légère et forte
(\*) La prévision d'orage avec grêle n'est disponible qu'en Europe centrale
