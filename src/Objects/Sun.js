class Sun {
    constructor(sizeRadius, canvas) {
      this.sizeRadius = sizeRadius;
      this.color = '#FDB813'
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.sizeRadius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }
  }