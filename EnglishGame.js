const dice = document.element(p)
body.appendChild (dice);



console.log("test");


// Fonction pour générer un lancer de dé
function lancerDe(nombreFaces) {
  if (nombreFaces < 1) {
      console.error("Le dé doit avoir au moins une face.");
      return null;
  }
  return Math.floor(Math.random() * nombreFaces) + 1;
}

// Exemple d'utilisation
const resultat = lancerDe(6); // Lancer un dé à 6 faces
console.log(`Résultat du lancer de dé : ${resultat}`);
