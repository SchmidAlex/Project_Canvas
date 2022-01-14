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
      this.setActionTime = 5;
      this.destinationTimeSpeed;
      this.slowDownOrSpeedUp = false;
    }

    /**
     * Draw function for the planet. The function draws the planet on the canvas
     * @param ctx with which we want to draw
     */
    draw(ctx, actualTime) {
      if (this.slowDownOrSpeedUp) {
        this.speedUpAndSlowDown(Math.floor(actualTime), this.destinationTimeSpeed);
      }
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
      // Calculate the holdtime of the mouse in ms
      let holdTime = mouseTimeUp - mouseTimeDown;
      // Calculate velocity in px per ms
      let calculatedVelocity = (mouseUpPoint - mouseDownPoint) / holdTime;
      this.interreactionVelocity = this.defaultVelocity * calculatedVelocity * 1000;
      this.destinationTimeSpeed = Math.floor(mouseTimeUp + this.setActionTime * 1000);
      this.slowDownOrSpeedUp = true;
    }

    /**
     * Handels speeding planets up or slowing them down.
     * @param actualActionTime 
     * @param speedUpOrSlowDownTime 
     */
    speedUpAndSlowDown(actualActionTime, speedUpOrSlowDownTime){
      if (actualActionTime > speedUpOrSlowDownTime - 10 && actualActionTime < speedUpOrSlowDownTime + 10) { 
        this.slowDownOrSpeedUp = false;
        if (this.interreactionVelocity > 0) {
          if (this.interreactionVelocity == this.defaultVelocity) {
            this.currentVelocity = this.defaultVelocity;
            this.interreactionVelocity = 0;
          } else {
            this.currentVelocity = this.defaultVelocity * this.interreactionVelocity;
            let tempThis = this;
            setTimeout(function(){
              tempThis.interreactionVelocity = tempThis.defaultVelocity;
              tempThis.slowDownOrSpeedUp = true;
              tempThis.destinationTimeSpeed = Math.floor(actualActionTime + tempThis.setActionTime * 1000);
            }, this.setActionTime * 1000);

          }
        } else if (this.onHold) {
          this.currentVelocity = 0;
        } else {
          this.currentVelocity = this.defaultVelocity;
        }
      } else {
        if (this.interreactionVelocity > 1 && this.currentVelocity < this.defaultVelocity * this.interreactionVelocity) {
          this.currentVelocity = this.currentVelocity * 1.01;
        } else if (this.interreactionVelocity < 1 && this.interreactionVelocity != 0 && this.currentVelocity > this.defaultVelocity * this.interreactionVelocity && this.interreactionVelocity != this.defaultVelocity) {
          this.currentVelocity = this.currentVelocity / 1.01;
        } else if (this.interreactionVelocity === 0 && this.onHold) {
          this.currentVelocity = this.currentVelocity / 1.01;
        } else if (this.currentVelocity < this.defaultVelocity && this.interreactionVelocity === 0 && !this.onHold) { 
          if (this.currentVelocity > this.defaultVelocity) {
            this.currentVelocity = this.defaultVelocity;
          } else {
            if (this.currentVelocity === 0){
              this.currentVelocity = this.defaultVelocity / 10;
            }
            this.currentVelocity = this.currentVelocity * 1.01;
          }
        } else if (this.interreactionVelocity == this.defaultVelocity && this.currentVelocity > this.defaultVelocity) {
          this.currentVelocity = this.currentVelocity / 1.01;
        } else if (this.interreactionVelocity == this.defaultVelocity && this.currentVelocity < this.defaultVelocity) {
          this.currentVelocity = this.currentVelocity * 1.01
        } else if (this.onHold){
          this.currentVelocity = this.currentVelocity / 1.01;
        }
      }
    }

    setOnHold(mouseTimeDown){
      this.onHold = true;
      this.slowDownOrSpeedUp = true;
      this.destinationTimeSpeed = Math.floor(mouseTimeDown + this.setActionTime * 1000);
    }

    breakOnHold(mouseTimeUp){
      this.onHold = false;
      this.slowDownOrSpeedUp = true;
      this.destinationTimeSpeed = Math.floor(mouseTimeUp + this.setActionTime * 1000);
    }

}