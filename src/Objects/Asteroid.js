class Asteroid {
    constructor(size, velocity, canvas, color) {
      this.size = size;
      this.velocity = velocity;
      this.color = color;
      this.side = Math.floor(Math.random() * 4)
      switch (this.side) {
        case 0:
          this.x = Math.floor(Math.random() * canvas.width);
          this.y = 0;
          break;
        case 1:
          this.x = 0;
          this.y = Math.floor(Math.random() * canvas.width);
          break;
        case 2:
          this.x = canvas.width
          this.y = Math.floor(Math.random() * canvas.width);
          break;
        case 3:
          this.x = Math.floor(Math.random() * canvas.width);
          this.y = canvas.width;
          break;
      }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        switch (this.side) {
          case 0:
            this.x += 1;
            this.y += 1;
            break;
          case 1:
            this.x += 1;
            this.y += 1;
            break;
          case 2:
            this.x -= 1;
            this.y -= 1;
            break;
          case 3:
            this.x -= 1;
            this.y -= 1;
            break;
        }
        ctx.fill();
        ctx.closePath();
        }
  }