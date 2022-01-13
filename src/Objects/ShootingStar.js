class ShootingStar {
    constructor(size, velocity, color) {
      this.size = size;
      this.velocity = velocity;
      this.color = color;
      //maybe a direction or something?
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(50, 50, this.size, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
  }