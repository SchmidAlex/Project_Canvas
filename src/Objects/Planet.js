class Planet {
    constructor(distanceRadius, canvas) {
      this.sizeRadius = Math.floor(Math.random() * 5) + 10;
      this.defaultVelocity = ((Math.random() * 20) + 5) / 10000;
      this.currentVelocity = this.defaultVelocity;
      this.interreactionVelocity = 0;
      this.winkel = 0;
      this.distanceRadius = distanceRadius;
      this.color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
      this.x = canvas.width / 2 + distanceRadius;
      this.y = canvas.height / 2;
    }

    draw(ctx) {
      // if (this.interreactionVelocity > 0 && this.interreactionVelocity > this.currentVelocity) {
      //   this.currentVelocity = this.currentVelocity * 1.5;
      // }else if(this.interreactionVelocity > 0 && this.interreactionVelocity < this.currentVelocity){
      //   this.currentVelocity = this.currentVelocity / 1.5;
      // }
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc((this.x - this.distanceRadius) + Math.sin(this.winkel * Math.PI) * this.distanceRadius, this.y + Math.cos(this.winkel * Math.PI) * this.distanceRadius, this.sizeRadius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
      this.winkel += this.velocity;
      if(this.winkel > 2){
        this.winkel = 0;
      }

    }
}