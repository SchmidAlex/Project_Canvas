class ShootingStar {
    constructor(size, velocity, color, canvas, livingTime) {
      this.size = size;
      this.velocity = velocity;
      this.color = color;
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      //maybe a direction or something?
      this.ticker = 0;
      this.livingTime = livingTime;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if(this.ticker <= this.livingTime) {
          ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
          this.x += 1;
          this.y += 1;
          this.ticker += 1;
        }
        ctx.fill();
        ctx.closePath();
    }
  }