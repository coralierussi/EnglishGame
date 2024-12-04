// Création de l'élément body
const body = document.body;

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
