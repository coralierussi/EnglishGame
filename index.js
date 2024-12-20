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
dice.textContent = 'Roll the dice';
dice.classList.add('btn-de');
dice.style.display = 'inline-block';
body.appendChild(dice);

// Fonction pour afficher la page du timer
function showTimerPage() {
  // Cacher le conteneur du dé
  container.style.display = 'none';
  dice.style.display = 'none';

  // Afficher la section du timer
  timerContainer.style.display = 'block';
}

function showDicePage() {
  // Réinitialiser l'affichage du cube et du bouton
  container.style.display = 'inline-block';
  dice.style.display = 'inline-block';  // Afficher le bouton pour relancer le dé

  // Réappliquer la transformation de rotation du cube
  cube.style.transform = `rotateX(0deg) rotateY(0deg)`; // Exemple de réinitialisation

  // Masquer la section du timer
  timerContainer.style.display = 'none';
  startButton.style.display = 'inline-block'; // Réafficher le bouton "Démarrer le timer"
  answeredButton.style.display = 'none'; // Masquer le bouton "Répondu"
  timeLeft = 30; // Réinitialiser le temps
  timerDisplay.textContent = ''; // Effacer le texte du timer
}


// Fonction pour revenir à la page du cube après la fin des audios
function returnToCubePageAfterAudio(audio) {
  audio.addEventListener('ended', () => {
    showDicePage(); // Afficher la page du cube après la fin de l'audio
  });
}


// Préchargement des sons
const audioTimer = new Audio("links/tic-tac-27828 v2.mp3"); // Son du tic-tac
const audioFinish = new Audio("links/boo-6377.mp3"); // Son de fin
const audioAnswer = new Audio("links/CRWDApls_Applaudissements 1 (ID 2363)_LS.mp3"); // Son pour la réponse


// Appliquer la fonction au son de la réponse et au son de fin
returnToCubePageAfterAudio(audioFinish);
returnToCubePageAfterAudio(audioAnswer);

// Fonction pour faire tourner le dé
function rotateCubeRandomly() {
  if (isRotating) return; // Bloque si une rotation est en cours

  isRotating = true; // Marque la rotation comme en cours

  const randomX = (Math.floor(Math.random() * 4) + 4) * 90; // 4 tours complets + une orientation aléatoire
  const randomY = (Math.floor(Math.random() * 4) + 4) * 90;

  cube.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;

  setTimeout(() => {
    isRotating = false; // Autorise une nouvelle rotation

    // Changer de page après 5 secondes
    setTimeout(() => {
      showTimerPage();
    }, 2500);
  }, 500); // Durée de transition définie dans le CSS
}

// Ajouter un événement au bouton pour lancer le dé
dice.addEventListener('click', () => {
  rotateCubeRandomly();
});

// TIMER + BTN LANCER/ REPONSE

// Création des éléments pour le timer
const timerContainer = document.createElement('div');
timerContainer.style.textAlign = 'center';
timerContainer.style.marginTop = '20px';
timerContainer.style.display = 'none'; // Masquer par défaut

const timerDisplay = document.createElement('div');
timerDisplay.style.fontSize = '24px';

const startButton = document.createElement('button');
startButton.textContent = "Let's time";
startButton.classList.add('btn-time');

const answeredButton = document.createElement('button');
answeredButton.textContent = "Answer";
answeredButton.classList.add('btn-answer');
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
  timerDisplay.textContent = `Time : ${timeLeft} s`;
  timerDisplay.classList.add ('timer');

  if (timeLeft > 0) {
    timeLeft--;
    audioTimer.play();
  } else {
    clearInterval(timerInterval);
    timerDisplay.textContent = "Finish !";
    answeredButton.style.display = 'none';
    audioTimer.pause();
    audioTimer.currentTime = 0;
    audioFinish.play();
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
  timerDisplay.textContent = "Answered!";
  answeredButton.style.display = 'none';
  
  // Arrêter le son du timer immédiatement
  audioTimer.pause();
  audioTimer.currentTime = 0;
  audioAnswer.play();
});
