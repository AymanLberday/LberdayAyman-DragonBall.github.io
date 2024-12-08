class Obstacle {
    constructor(x, y, r, couleur) {
      this.pos = createVector(x, y);
      this.r = r;
      this.color = couleur;
    }
  
    show() {
      image(meteorImage, this.pos.x - this.r, this.pos.y - this.r, this.r * 2, this.r * 2);
    }
  }