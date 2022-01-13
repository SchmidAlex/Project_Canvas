class Asteroid {
    constructor(size, velocity) {
      this.size = size;
      this.velocity = velocity;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(50, 50, this.size, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        }
  }