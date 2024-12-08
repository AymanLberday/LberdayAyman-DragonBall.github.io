let goku;
let balls = [];
let friezas = [];
let obstacles = [];
let kamehamehas = [];
let snakeMode = true;
let bgImage;
let friezaImage;
let ballImage;
let gokuImage;
let meteorImage;
let kamehamehaImage;
let backgroundImage;
let sliderVitesseMaxFriezas;
let sliderVitesseMaxBalls;
let sliderVitesseMaxGoku;
let friezaCountP;
let ballsCountP;

function preload() {
  bgImage = loadImage('assets/namek.jpg');
  friezaImage = loadImage('assets/frieza.png');
  ballImage = loadImage('assets/dragonballs1.png');
  gokuImage = loadImage('assets/goku_2D2.png');
  meteorImage = loadImage('assets/meteor2.png');
  kamehamehaImage = loadImage('assets/kamehameha.png');
  backgroundImage = loadImage('assets/namek.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  goku = new Goku(mouseX, mouseY);
  // Création des friezas et des dragons balls
  for (let i = 0; i < 10; i++) {
    friezas.push(new Frieza(random(width), random(height)));
  }
  for (let i = 0; i < 5; i++) {
    balls.push(new Ball(random(width), random(height)));
  }
  obstacles.push(new Obstacle(width / 2, height / 2, 100, "green"));

  // Création des sliders
  createMonSlider("Vitesse Friezas", 1, 10, 3, 0.1, 20, 0, "white", "maxSpeed", friezas);
  createMonSlider("Vitesse Balls", 1, 10, 5, 0.1, 20, 40, "white", "maxSpeed", balls);
  createMonSlider("Vitesse Goku", 1, 10, 5, 0.1, 20, 80, "white", "maxSpeed", [goku]);
  // affiche le nombre de friezas
  friezaCountP = createP(`Nombre de friezas: ${friezas.length}`);
  friezaCountP.style('color', 'white');
  friezaCountP.position(20, 120);
  // affiche le nombre de dragon balls
  ballsCountP = createP(`Nombre de dragon balls: ${balls.length}`);
  ballsCountP.style('color', 'white');
  ballsCountP.position(20, 150);
}

function draw() {
  background(backgroundImage);
  image(bgImage, 0, 0, width, height);
  // affiche les obstacles
  obstacles.forEach((obstacle) => obstacle.show());
  // Mise à jour et affichage de GOKU
  goku.applyBehaviors(mouseX, mouseY, obstacles, balls);
  goku.update();
  goku.show();
  
  // Mise à jour et affichage des dragon balls et METHODE SNAKE 
  let leader = goku.pos;

  switch (snakeMode) {
    case true:
      balls.forEach((ball, index) => {
        leader = index === 0 ? goku.pos : balls[index - 1].pos;
        ball.applyBehaviors(leader, obstacles, balls);
        ball.update();
        ball.show();
      });
      break;

    case false:
      balls.forEach((ball) => {
        ball.applyBehaviors(goku.pos, obstacles, balls);
        ball.update();
        ball.show();
      });
      break;

    default:
      console.warn("Valeur inattendue pour snakeMode :", snakeMode);
  }


  // Vérifiez les collisions entre les hommes et les friezas
  for (let i = balls.length - 1; i >= 0; i--) {
    if (balls[i].checkCollision(friezas)) {
      balls.splice(i, 1); // Supprimez l'homme touché
      // Score -= 100;
      // Ajouter frieza 
      friezas.push(new Frieza(random(width), random(height)));
    }
  }
  // Vérifiez les collisions entre les friezas et le goku
if (goku.checkCollision(friezas)) {
  // supprimez tout les friezas
  friezas = [];
  // recréer des friezas
  for (let i = 0; i < 10; i++) {
    friezas.push(new Frieza(random(width), random(height)));
  }
}


  // Mise à jour et affichage des missiles
  kamehamehas.forEach((kamehameha, kIndex) => {
    if (friezas.length > 0) {
      kamehameha.applyBehaviors(friezas[0].pos);
    }
    kamehameha.update();
    kamehameha.show();

    // Vérifiez la collision entre la balle et les friezas
    friezas.forEach((frieza, fIndex) => {
      if (p5.Vector.dist(kamehameha.pos, frieza.pos) < kamehameha.r + frieza.size / 2) {
        // Supprimez le frieza et la balle
        friezas.splice(fIndex, 1);
        kamehamehas.splice(kIndex, 1);
      }
    });
  });

  // Mise à jour et affichage des friezas
  friezas.forEach((frieza) => {
    frieza.applyBehaviors(obstacles);
    frieza.update();
    frieza.show();
  });

  // Mise à jour du nombre de friezas
  friezaCountP.html(`Nombre de friezas : ${friezas.length}`);
  // Mise à jour du nombre d'hommes
  ballsCountP.html(`Nombre de dragon balls : ${balls.length}`);
}

function keyPressed() {
  console.log(key);
  // Ajout d'une dragon ball
  if (key === 'm') {
    balls.push(new Ball(random(width), random(height)));
  }
  // Balls en mode serpent activé/désactivé
  if (key === 's') {
    snakeMode = !snakeMode;
  }
  // Ajout d'un frieza 
  if (key === 'f') {
    friezas.push(new Frieza(random(width), random(height)));
  }
  // Ajout d'un obstacle à la position de la souris
  if (key === 'o') {
    obstacles.push(new Obstacle(mouseX, mouseY, random(20, 80), "green"));
  }
  // tir de missiles limité au nombre de friezas sur la map
  if (key === 'k') {
    if (friezas.length > 0 && kamehamehas.length < friezas.length)
      kamehamehas.push(new Kamehameha(goku.pos.x, goku.pos.y));
  }
  if (key === 'd') {
    Personnage.debug = !Personnage.debug;
    Obstacle.debug = !Obstacle.debug;
    Kamehameha.debug = !Kamehameha.debug;
  }

}

function createMonSlider(label, min, max, val, step, x, y, color, prop, targetArray) {
  // On crée un slider pour régler la vitesse max
  // des véhicules
  // slider les paramètres : Min, Max, Valeur, Pas
  let slider = createSlider(min, max, val, step);
  // on positionne le slider en haut à gauche du canvas
  slider.position(100, y + 17);
  // Label à gauche du slider "maxSpeed"
  let labelHTML = createP(label);
  // label en blanc
  labelHTML.style('color', 'white');
  // on le positionne en x=10 y = 10
  labelHTML.position(x, y);
  //on affiche la valeur du slider à droite du slider
  let labelValue = createP(slider.value());
  labelValue.style('color', color);
  labelValue.position(250, y);
  // on veut que la valeur soit mise à jour quand on déplace
  // le slider
  slider.input(() => {
    labelValue.html(slider.value());
    // On change la propriété de tous les personnages
    targetArray.forEach(item => {
      item[prop] = slider.value();
    });
  });
}