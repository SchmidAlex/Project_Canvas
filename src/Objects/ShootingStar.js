class ShootingStar {
    /**
     * 
     * @param {size of the shooting star in pixel} size 
     * @param {velocity of the shooting star} velocity 
     * @param {color of the shooting star} color 
     * @param {canvas sbject} canvas 
     * @param {duration of the shooting star to appear in space} livingTime 
     */
    constructor(size, velocity, color, canvas, livingTime) {
      this.size = size;
      this.velocity = velocity;
      this.color = color;

      //the x Position and y Position for the shooting star to appear. random calculated based on the canvas dimensions
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      
      //counter for the living time
      this.ticker = 0;
      this.livingTime = livingTime;
    }

    draw(ctx) {

        //set color based on parameter given when initialising shooting star class
        ctx.fillStyle = this.color;
        ctx.beginPath();

        // check if the living time of the shooting star is already reached
        if(this.ticker <= this.livingTime) {

          //draw shooting star
          ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
          
          //increase position for moving effect when shooting star is redrawing itself
          this.x += 1;
          this.y += 1;

          //increase counter
          this.ticker += 1;
        }
        ctx.fill();
        ctx.closePath();
    }
  }