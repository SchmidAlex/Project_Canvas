class Asteroid {
  
    /**
     * Constructor of the asteroid
     * @param {Size of the asteroid in pixel} size 
     * @param {Velocity of the asteroid} velocity 
     * @param {Canvas object} canvas 
     * @param {Color of the asteroid} color 
     */
    constructor(size, velocity, canvas, color) {
      this.size = size;
      this.velocity = velocity;
      this.color = color;

      // Choose random one of four sides for the asteriod to appear
      this.side = Math.floor(Math.random() * 4)
      switch (this.side) {
        // Asteroid spawns on top border
        case 0:
          this.x = Math.floor(Math.random() * canvas.width);
          this.y = 0 - this.size;
          break;
        
        // Asteroid spawns on left border
        case 1:
          this.x = 0 - this.size;
          this.y = Math.floor(Math.random() * canvas.height);
          break;

        // Asteroid spawns on right border
        case 2:
          this.x = canvas.width + - this.size
          this.y = Math.floor(Math.random() * canvas.height);
          break;

        // Asteroid spawns on right border
        case 3:
          this.x = Math.floor(Math.random() * canvas.width);
          this.y = canvas.height +- this.size;
          break;
      }
    }

    draw(ctx) {

        // Set color based on parameter given when initialising asteroid class
        ctx.fillStyle = this.color;
        ctx.beginPath();

        // Draw asteroid
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);

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