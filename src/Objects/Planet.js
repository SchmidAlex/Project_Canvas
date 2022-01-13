class Planet {
    constructor(distanceRadius) {
      this.sizeRadius = Math.floor(Math.random() * 5) + 10;
      this.defaultVelocity = ((Math.random() * 20) + 5) / 10000;
      this.currentVelocity = this.defaultVelocity;
      this.interreactionVelocity = 0;
      this.winkel = 0;
      this.distanceRadius = distanceRadius;
      this.color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
    }

    draw(ctx, canvas) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(canvas.width / 2 + this.distanceRadius , canvas.height / 2, this.sizeRadius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
      this.winkel += this.currentVelocity;
      if(this.winkel > 2){
        this.winkel = 0;
      }
    }

    changeVelocity(speed){

    }
}