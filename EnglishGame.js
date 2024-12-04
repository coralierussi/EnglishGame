const body = document.body;


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
const container = document.getElementById('cube-container');
const cube = createCube();
container.appendChild(cube);

// Création du bouton "Lancer le dé"
const dice = document.createElement('button');
dice.textContent = 'Lancer le dé';
dice.classList.add('btn-de');
body.appendChild(dice);

// Fonction pour faire tourner le dé
function rotateCubeRandomly() {
  const randomX = Math.floor(Math.random() * 4) * 90; // Multiple de 90
  const randomY = Math.floor(Math.random() * 4) * 90; // Multiple de 90
  cube.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;
}

// Ajouter un événement au bouton pour lancer le dé
dice.addEventListener('click', () => {
  rotateCubeRandomly();
});

// Initialiser la rotation avec un intervalle
const intervalId = setInterval(rotateCubeRandomly, 2000);

// Arrêter la rotation après 10 secondes
setTimeout(() => {
  clearInterval(intervalId); // Arrête l'intervalle
  console.log('Le dé a arrêté de tourner.');
}, 10000);
