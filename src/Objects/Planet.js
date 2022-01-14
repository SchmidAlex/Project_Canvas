class Planet {

  /**
   * Constructor of a planet... almost everything is random generated
   * @param distanceRadius the distance to the sun
   * @param canvas the canvas, which we want to draw on
   */
  constructor(distanceRadius, canvas) {

    // Random radius of the planet, from 10 to 15
    this.sizeRadius = Math.floor(Math.random() * 5) + 10;

    // Random default velocity of the planet. The velocity is the angle-speed of the planet, thats why we divide it by 10000
    this.defaultVelocity = ((Math.random() * 15) + 5) / 10000;

    // The current velocity is set to the default velocity
    this.currentVelocity = this.defaultVelocity;

    // The interreactionVelocity is a calculated speed of the mouse-drag on the canvas. This is set to 0 in the constructor
    this.interreactionVelocity = 0;

    // Boolean to know if the left mouse button is clicked or not (to slow down or getting default velocity)
    this.onHold = false;

    // This is the angle in radiant we have. As soon it hits 2, it will be set to 0 again
    this.angle = 0;

    // This is the distance from the planet to the sun
    this.distanceRadius = distanceRadius;

    // We generate a random color for the planet (the planet could also be black and so in our canvas invisible)
    this.color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
    
    // Get the starting x point from the planet. Its calculated with the sun x point (center of the canvas) and added the distance to the sun
    this.x = canvas.width / 2 + distanceRadius;

    // Get the starting y point from the planet (center of the canvas)
    this.y = canvas.height / 2;

    // Here we set an Action time, wich the planet needs to do an action (speed up to or slow down or stop)
    this.setActionTime = 5;

    // The destinationTimeSpeed is the time when the Planet finishes its action. It gets calculated in the code 
    this.destinationTimeSpeed;

    // This boolean tells the code if the planet needs to slow down or speed up
    this.slowDownOrSpeedUp = false;
  }

  /**
   * Draw function for the planet. The function draws the planet on the canvas
   * @param ctx with which we want to draw
   * @param actualTime is the time in ms
   */
  draw(ctx, actualTime) {

    // If the planet needs to slow down or speed up, a function will get called
    if (this.slowDownOrSpeedUp) {
      this.speedUpAndSlowDown(Math.floor(actualTime), this.destinationTimeSpeed);
    }

    // Draw the planet
    ctx.beginPath();
    ctx.fillStyle = this.color;

    // Calculate the next position of the planet with the angle
    ctx.arc((this.x - this.distanceRadius) + Math.sin(this.angle * Math.PI) * this.distanceRadius, this.y + Math.cos(this.angle * Math.PI) * this.distanceRadius, this.sizeRadius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();

    // Increment the angle with the current velocity
    this.angle += this.currentVelocity;

    // Reset the angle
    if(this.angle > 2) {
      this.angle = 0;
    }
  }

  /**
   * This function calculates the speed for the planets of an click, drag and release interreacten
   * @param mouseDownPoint is the x position when the left mouse button was pressed
   * @param mouseUpPoint is the x position when the left mouse button were released
   * @param mouseTimeDown is the time, when the left mouse button was pressed
   * @param mouseTimeUp is the time, when the left mouse button were released
   */
  setInterreactionVelocity(mouseDownPoint, mouseUpPoint, mouseTimeDown, mouseTimeUp) {

    // Calculate the holdtime of the mouse in ms
    let holdTime = mouseTimeUp - mouseTimeDown;

    // Calculate velocity of the mouse in px per ms
    let calculatedVelocity = (mouseUpPoint - mouseDownPoint) / holdTime;

    // Use the calculated velocity from the mouse as multiplicator for the speedup (multiplicated with 1000 because it was too low)
    this.interreactionVelocity = this.defaultVelocity * calculatedVelocity * 1000;

    // Calculate the time, when we reache this speed
    this.destinationTimeSpeed = Math.floor(mouseTimeUp + this.setActionTime * 1000);

    // Set the boolean to true, which means the planets needs to change their speed
    this.slowDownOrSpeedUp = true;
  }

  /**
   * Handels speeding planets up or slowing them down.
   * @param actualActionTime the actual time in ms
   * @param speedUpOrSlowDownTime the calculated time, when the planets reaches their speed
   */
  speedUpAndSlowDown(actualActionTime, speedUpOrSlowDownTime) {

    // Check if the time runned out to reach their speed
    if (actualActionTime > speedUpOrSlowDownTime - 10 && actualActionTime < speedUpOrSlowDownTime + 10) { 

      // We dont have to change the speed of the planets anymore, so we set this boolean to false
      this.slowDownOrSpeedUp = false;

      // Check if the speed were just to stop the planets
      if (this.interreactionVelocity > 0) {

        // Check if the acceleration process was to get the default velocity again
        if (this.interreactionVelocity == this.defaultVelocity) {

          // If so, we set the current velocity to the default again and set the interreaction velocity to 0 again
          this.currentVelocity = this.defaultVelocity;
          this.interreactionVelocity = 0;
        } else {

          // Else we set the current velocity to its definitive value and make an timeout to get to default speed again
          this.currentVelocity = this.defaultVelocity * this.interreactionVelocity;

          // We need the current object again, because we gona use a window function
          let tempThis = this;

          // Window function to set a timeout (asynchron)
          window.setTimeout(function() {

            // When the time passed, we will create a new interreaction velocity to the default velocity of the planet
            tempThis.interreactionVelocity = tempThis.defaultVelocity;

            // We need to change the speed of the planet, so we set this boolean on true
            tempThis.slowDownOrSpeedUp = true;

            // We calculate the time again, we have to reach the speed
            tempThis.destinationTimeSpeed = Math.floor(actualActionTime + tempThis.setActionTime * 1000);
          }, this.setActionTime * 1000);
        }

        // If the speed-change was just to stop the planets, we gona check if we are increasing the speed to the default again or stopping them
      } else if (this.onHold) {
        this.currentVelocity = 0;

        // The speed-change was to reach the default speed again
      } else {
        this.currentVelocity = this.defaultVelocity;
      }

      // Else the time to reach the speed didnt ran out so we just increase the speed step by step
    } else {

      // If the multiplicator for the speed is over 1 and the current velocity less than the default velocity multiplicated with the multiplicator we need to increase the speed for a step
      if (this.interreactionVelocity > 1 && this.currentVelocity < this.defaultVelocity * this.interreactionVelocity) {

        // Multiplicate the current velocity with the multiplicator 1.01 to get an adaptive acceleration
        this.currentVelocity = this.currentVelocity * 1.01;

        // Check if the multiplicator for the speed is under 1 (lower the speed), also it cant be 0. Check also if the current velocity isnt slower as our aiming speed
      } else if (this.interreactionVelocity < 1 && this.interreactionVelocity != 0 && this.currentVelocity > this.defaultVelocity * this.interreactionVelocity && this.interreactionVelocity != this.defaultVelocity) {
        
        // Divide the current velocity with the divident 1.01 to get an adaptive slowdown
        this.currentVelocity = this.currentVelocity / 1.01;

        // Check if the new speed should be a stop
      } else if (this.interreactionVelocity === 0 && this.onHold) {

        // Slow the planets down with the divident 1.01
        this.currentVelocity = this.currentVelocity / 1.01;

        // Check if the current velocity is less than the default, also make sure that there is no interreaction (to get default velocity on the planet again after an hold)
      } else if (this.currentVelocity < this.defaultVelocity && this.interreactionVelocity === 0 && !this.onHold) { 

        // Check if the planets stopped
        if (this.currentVelocity === 0){
          
          // If so, get a little speed back in them
          this.currentVelocity = this.defaultVelocity / 10;
        }

        // Accelerate the planets
        this.currentVelocity = this.currentVelocity * 1.01;
        
        // Check if the speedchange was made for reaching the default velocity again and make sure the speed wont go under the default
      } else if (this.interreactionVelocity == this.defaultVelocity && this.currentVelocity > this.defaultVelocity) {

        // Check if the speed is higher than the default
        if (this.currentVelocity > this.defaultVelocity) {

          // Slowdown the planet
          this.currentVelocity = this.currentVelocity / 1.01;
        } else {

          // If not then accelerate the planets
          this.currentVelocity = this.currentVelocity * 1.01
        }

        // Check if the planets were on hold through an click
      } else if (this.onHold) {

        // If so slow them down
        this.currentVelocity = this.currentVelocity / 1.01;
      }
    }
  }

  /**
   * Function to handle the mouseclick
   * @param mouseTimeDown the time, when the left mouse button was pressed down
   */
  setOnHold(mouseTimeDown) {
    
    // Set the boolean, to know, that the left mouse button is pressed
    this.onHold = true;

    // Set the boolean, to know, that we need to change the speed of the planets
    this.slowDownOrSpeedUp = true;

    // Calculate the time, when we will reach our speed
    this.destinationTimeSpeed = Math.floor(mouseTimeDown + this.setActionTime * 1000);
  }

  /**
   * Function to handle the mouseclick release
   * @param mouseTimeUp the time, when the left mouse button were released
   */
  breakOnHold(mouseTimeUp) {

    // Set the boolean, to know, that the left mouse button were released
    this.onHold = false;

    // Set the boolean, to kno, that we need to change the speed again
    this.slowDownOrSpeedUp = true;

    // Calculate the time, when we will reach our speed
    this.destinationTimeSpeed = Math.floor(mouseTimeUp + this.setActionTime * 1000);
  }
}