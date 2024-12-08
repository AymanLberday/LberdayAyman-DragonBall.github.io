
// SANGOKU OU GOKU C'EST LE PERSO PRINCIPAL !!!! il tirera sur TOUS LES FRIEZAS pour sauver la terre !!!!




class Goku extends Personnage {
    constructor(x, y) {
      super(x, y);
      this.size = 100;
      this.color = "blue";
  
  
      this.avoidWeight = 3;
      this.arriveWeight = 2;
      this.separateWeight = 1;
    }
  
    
    applyBehaviors(mouseX, mouseY, obstacles, men) {
      let mousePos = createVector(mouseX, mouseY);
      let arriveForce = this.arrive(mousePos, 0);
      let avoidForce = this.avoid(obstacles,false);
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
          image(gokuImage, this.pos.x - this.size/2, this.pos.y - this.size/2, this.size, this.size);
      }
    }
    