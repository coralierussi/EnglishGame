// Création de l'élément body
const body = document.body;



// DICE AND BTN LANCER

let isRotating = false; // Indique si le dé est en train de tourner

// Création du conteneur du cube
const container = document.createElement('div');
container.id = 'cube-container';
body.appendChild(container);

// Fonction pour créer un point
function createDot(position) {
  const dot = document.createElement('div');
  dot.classList.add('dot', position);
  return dot;
}

// Fonction pour créer une face
function createFace(className, dots) {
  const face = document.createElement('div');
  face.classList.add('face', className);

  dots.forEach(position => {
    face.appendChild(createDot(position));
  });

  return face;
}

// Fonction pour créer le dé
function createCube() {
  const cube = document.createElement('div');
  cube.classList.add('cube');

  // Ajouter les 6 faces du dé
  cube.appendChild(createFace('front', ['center'])); // 1
  cube.appendChild(createFace('back', ['top-left', 'bottom-right'])); // 2
  cube.appendChild(createFace('left', ['top-left', 'center', 'bottom-right'])); // 3
  cube.appendChild(createFace('right', ['top-left', 'top-right', 'bottom-left', 'bottom-right'])); // 4
  cube.appendChild(createFace('top', ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'])); // 5
  cube.appendChild(createFace('bottom', ['top-left', 'top-right', 'center-left', 'center-right', 'bottom-left', 'bottom-right'])); // 6

  return cube;
}

// Ajouter le cube au conteneur
const cube = createCube();
container.appendChild(cube);

// Création du bouton "Lancer le dé"
const dice = document.createElement('button');
dice.textContent = 'Lancer le dé';
dice.classList.add('btn-de');
body.appendChild(dice);

// Fonction pour faire tourner le dé

function rotateCubeRandomly() {
  const randomX = Math.floor(Math.random() * 4 + 4) * 90; // Multiple de 90
  const randomY = Math.floor(Math.random() * 4 + 4) * 90; // Multiple de 90
  cube.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;
}
function rotateCubeRandomly() {
  if (isRotating) return; // Bloque si une rotation est en cours

  isRotating = true; // Marque la rotation comme en cours

  const randomX = (Math.floor(Math.random() * 4) + 4) * 90; // 4 tours complets + une orientation aléatoire
  const randomY = (Math.floor(Math.random() * 4) + 4) * 90;

  cube.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;

setTimeout(() => {
  isRotating = false; // Autorise une nouvelle rotation
}, 500); // 2 secondes = durée de transition définie dans le CSS
}

// Ajouter un événement au bouton pour lancer le dé
dice.addEventListener('click', () => {
  rotateCubeRandomly();
});




// TIMER + BTN LANCER/ REPONSE


// Création des éléments
const timerContainer = document.createElement('div');
timerContainer.style.textAlign = 'center';
timerContainer.style.marginTop = '20px';

const timerDisplay = document.createElement('div');
timerDisplay.style.fontSize = '24px';

const startButton = document.createElement('button');
startButton.textContent = "Let's time";
startButton.style.padding = '10px 20px';
startButton.style.fontSize = '16px';

const answeredButton = document.createElement('button');
answeredButton.textContent = "Answer";
answeredButton.style.padding = '10px 20px';
answeredButton.style.fontSize = '16px';
answeredButton.style.display = 'none'; // Caché par défaut

timerContainer.appendChild(timerDisplay);
timerContainer.appendChild(startButton);
timerContainer.appendChild(answeredButton);
document.body.appendChild(timerContainer);

// Variables du timer
let timeLeft = 30;
let timerInterval = null;

// Fonction pour mettre à jour le timer
function updateTimer() {
  timerDisplay.textContent = `Time : ${timeLeft} sec`;

  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timerInterval);
    timerDisplay.textContent = "Finish !";
  }
}

// Lancer le timer au clic sur le bouton "Démarrer le timer"
startButton.addEventListener('click', () => {
  if (timerInterval) clearInterval(timerInterval); // Réinitialiser si déjà en cours
  timeLeft = 30; // Réinitialiser le temps
  updateTimer(); // Mettre à jour immédiatement
  timerInterval = setInterval(updateTimer, 1000);

  // Masquer le bouton "Démarrer le timer" et afficher "Répondu"
  startButton.style.display = 'none';
  answeredButton.style.display = 'inline-block';
});

// Action pour le bouton "Répondu"
answeredButton.addEventListener('click', () => {
  clearInterval(timerInterval); // Arrête le timer
  const audio = new Audio("links/CRWDApls_Applaudissements 1 (ID 2363)_LS.mp3"); // Exemple de son
  audio.play();
});

