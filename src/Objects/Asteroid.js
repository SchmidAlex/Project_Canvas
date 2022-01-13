class Asteroid {
    constructor(size, velocity) {
      this.size = size;
      this.velocity = velocity;
      this.color = '#964B00';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(50, 50, this.size, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        }
  }