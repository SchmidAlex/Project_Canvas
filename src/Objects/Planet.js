class Planet {
    constructor(distanceRadius) {
      this.sizeRadius = Math.floor(Math.random() * 5) + 10;
      this.velocity = Math.floor(Math.random() * 100) + 1;
      this.distanceRadius = distanceRadius;
      this.color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
    }

    draw(ctx, canvas) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(canvas.width / 2 + this.distanceRadius , canvas.height / 2, this.sizeRadius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }
}