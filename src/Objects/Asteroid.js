class Asteroid {
  
    /**
     * Constructor of the asteroid class
     * @param {Size of the asteroid in pixel} size 
     * @param {Velocity of the asteroid} velocity 
     * @param {Color of the asteroid} color 
     * @param {Living time boolean} livingTime
     */
    constructor(size, velocity, color, livingTime) {
      this.size = size;
      this.velocity = velocity;
      this.color = color;
      this.livingTime = livingTime;
      this.x;
      this.y;
    }

    /**
     * Function to change the spawning site of the asteroid
     * @param {Canvas object} canvas 
     */
    changeSides(canvas) {

      // Random asignement of the site. 0 = top. 1 = left. 2 = right. 3 = bottom
      this.side = Math.floor(Math.random() * 4)
      switch (this.side) {
        // Asteroid spawns on top border
        case 0:
          this.x = Math.floor(Math.random() * canvas.width);
          this.y = 10;
          break;
        
        // Asteroid spawns on left border
        case 1:
          this.x = 10;
          this.y = Math.floor(Math.random() * canvas.height);
          break;

        // Asteroid spawns on right border
        case 2:
          this.x = canvas.width - 10;
          this.y = Math.floor(Math.random() * canvas.height);
          break;

        // Asteroid spawns on bottom border
        case 3:
          this.x = Math.floor(Math.random() * canvas.width);
          this.y = canvas.height - 10;
          break;
      }
    }

    /**
     * Draw function of the asteroid class
     * @param {Ctx object} ctx 
     * @param {Canvas object} canvas 
     */
    draw(ctx, canvas) {

        // Set color based on parameter given when initialising asteroid class
        ctx.fillStyle = this.color;
        ctx.beginPath();

        // Draw asteroid
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        
        //check if the asteroid is still inside the canvas object
        if((this.x >= canvas.width + 5 || this.y >= canvas.height + 5) || (this.x < -5 || this.y < -5)) {

          //if not set living time to false for a new asteroid to get drawn in case of the random event takes place
          this.livingTime = false;
        }
        
        // Check side to move asteroid in the screen not outside
        switch (this.side) {
          // In case of the asteroid spawning on the top or left border, it can move down and right
          case 0:
            this.x += 1;
            this.y += 1;
            break;
          case 1:
            this.x += 1;
            this.y += 1;
            break;

          // In case of the asteroid spawning on the right or bottom border, it can move up and left
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