class Planet {

    /**
     * Constructor of a planet... almost everything is random generated
     * @param distanceRadius the distance to the sun
     * @param canvas the canvas, which we want to draw on
     */
    constructor(distanceRadius, canvas) {
      this.sizeRadius = Math.floor(Math.random() * 5) + 10;
      this.defaultVelocity = ((Math.random() * 15) + 5) / 10000;
      this.currentVelocity = this.defaultVelocity;
      this.interreactionVelocity = 0;
      this.onHold = false;
      this.winkel = 0;
      this.distanceRadius = distanceRadius;
      this.color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
      this.x = canvas.width / 2 + distanceRadius;
      this.y = canvas.height / 2;
    }

    /**
     * Draw function for the planet. The function draws the planet on the canvas
     * @param ctx with which we want to draw
     */
    draw(ctx) {
      this.speedUpAndSlowDown(1, 1/**+ 10 */);
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc((this.x - this.distanceRadius) + Math.sin(this.winkel * Math.PI) * this.distanceRadius, this.y + Math.cos(this.winkel * Math.PI) * this.distanceRadius, this.sizeRadius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
      this.winkel += this.currentVelocity;
      if(this.winkel > 2){
        this.winkel = 0;
      }
    }

    /**
     * Handels the speedup variable in the planet
     * @param mouseDownPoint X coords, when the user pressed the left mouse button
     * @param mouseUpPoint X coords, when the user left the left mouse button
     */
    setInterreactionVelocity(mouseDownPoint, mouseUpPoint, mouseTimeDown, mouseTimeUp){
      console.log(mouseUpPoint / mouseDownPoint / 10);
      this.interreactionVelocity = mouseUpPoint / mouseDownPoint / 10;
    }

    /**
     * Handels speeding planets up or slowing them down.
     * @param actualActionTime 
     * @param setActionTime 
     */
    speedUpAndSlowDown(actualActionTime, setActionTime){
      if (actualActionTime > setActionTime) {
        if (this.interreactionVelocity > 0) {
          this.currentVelocity = this.defaultVelocity * this.interreactionVelocity;
          this.interreactionVelocity = 0;
        } else if (this.onHold) {
          this.currentVelocity = 0;
        }
      } else {
        if (this.interreactionVelocity > 1) {
          this.currentVelocity = this.currentVelocity * 1.01;
        } else if (this.interreactionVelocity < this.currentVelocity && this.interreactionVelocity != 0) {
          this.currentVelocity = this.currentVelocity / 1.01 + this.interreactionVelocity;
        } else if (this.interreactionVelocity === 0 && this.onHold) {
          this.currentVelocity = this.currentVelocity / 1.01;
        } else if (this.currentVelocity < this.defaultVelocity && this.interreactionVelocity === 0 && !this.onHold) {
          this.currentVelocity = this.currentVelocity * 1.01;
        }
      }
    }

    setOnHold(){
      this.onHold = true;
    }

    breakOnHold(){
      this.onHold = false;
    }

}