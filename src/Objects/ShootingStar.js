class ShootingStar {
    constructor(size, velocity, color, canvas) {
      this.size = size;
      this.velocity = velocity;
      this.color = color;
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.width);
      //maybe a direction or something?
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
  }