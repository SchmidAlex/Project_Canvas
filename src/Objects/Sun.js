class Sun {
    constructor(sizeRadius) {
      this.sizeRadius = sizeRadius;
      this.color = '#FDB813'
    }

    draw(ctx, canvas) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, this.sizeRadius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }
  }