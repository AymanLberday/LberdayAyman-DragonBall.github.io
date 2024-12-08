
// J'ai voulu utiliser les dragon balls pour donner plus de boost au personnage puisque dans l'anime , une fois rassemblée , 
// elles permettent d'exhausser n'importe quel voeu !!!! Mais je n'ai pas réussi à finir à temps ...



class Ball extends Personnage {
    constructor(x, y) {
      super(x, y);
      this.size = 40;
      this.color = "yellow";
      this.maxSpeed = 5;
      this.maxForce = 0.4;
      this.vel = p5.Vector.random2D();
      this.vel.setMag(random(2, 4));
      this.acc = createVector();
      this.rayonZoneDeFreinage = 180;
  
      // poids pour les comportements
      this.arriveWeight = 0.6;
      this.avoidWeight = 3;
      this.separateWeight = 1;  
  
      this.distanceSeparation = this.r/2;
    }
  
    applyBehaviors(leader, obstacles, men) {
      let arriveForce = this.arrive(leader, this.r);
      let avoidForce = this.avoid(obstacles);
      let separateForce = this.separate(men);
  
      arriveForce.mult(this.arriveWeight);
      avoidForce.mult(this.avoidWeight);
      separateForce.mult(this.separateWeight);
  
      this.applyForce(arriveForce);
      this.applyForce(avoidForce);
      this.applyForce(separateForce);
  
      super.update();
    }
  
    checkCollision(friezas) {
      for (let i = 0; i < friezas.length; i++) {
        let d = p5.Vector.dist(this.pos, friezas[i].pos);
        if (d < this.size / 2 + friezas[i].size / 2) {
          return true;
        }
      }
      return false;
    }
  
  
      show() {
          image(ballImage, this.pos.x - this.size/2, this.pos.y - this.size/2, this.size, this.size);
          // this.drawPath();
        /* fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size); */
      }
    }
    