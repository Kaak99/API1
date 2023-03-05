// gestion temps.js//
//       //

//  .......  tests à retirer  ........ //
console.log(` --------> gestion temps.js`);

//  .......  const  ........ //

const joursSemaine = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
let ajd = new Date();
let options = { weekday: "long" };
let jourActuel = ajd.toLocaleDateString("fr-FR", options);
console.log("ajd=", ajd, "jourActuel=", jourActuel);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine
  .slice(joursSemaine.indexOf(jourActuel))
  .concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
//console.log("tabJoursEnOrdre=", tabJoursEnOrdre);

//retirer dernier jour du tableau car on ne fait que 6 jours de prevision
tabJoursEnOrdre = tabJoursEnOrdre.slice(0, 6);
console.log("tabJoursEnOrdre=", tabJoursEnOrdre);

export default tabJoursEnOrdre;
