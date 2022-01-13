class Asteroid {
    /**
     * 
     * @param {size of the asteroid in pixel} size 
     * @param {velocity of the asteroid} velocity 
     * @param {canvas object} canvas 
     * @param {color of the asteroid} color 
     */
    constructor(size, velocity, canvas, color) {
      this.size = size;
      this.velocity = velocity;
      this.color = color;

      //choose random one of four sides for the asteriod to appear
      this.side = Math.floor(Math.random() * 4)
      switch (this.side) {
        //asteroid spawns on top border
        case 0:
          this.x = Math.floor(Math.random() * canvas.width);
          this.y = 0 - this.size;
          break;
        
        //asteroid spawns on left border
        case 1:
          this.x = 0 - this.size;
          this.y = Math.floor(Math.random() * canvas.height);
          break;

        //asteroid spawns on right border
        case 2:
          this.x = canvas.width + - this.size
          this.y = Math.floor(Math.random() * canvas.height);
          break;

        //asteroid spawns on right border
        case 3:
          this.x = Math.floor(Math.random() * canvas.width);
          this.y = canvas.height +- this.size;
          break;
      }
    }

    draw(ctx) {

        //set color based on parameter given when initialising asteroid class
        ctx.fillStyle = this.color;
        ctx.beginPath();

        //draw asteroid
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);

        //check side to move asteroid in the screen not outside
        switch (this.side) {
          case 0:
            this.x += 1;
            this.y += 1;
            break;
          case 1:
            this.x += 1;
            this.y += 1;
            break;
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