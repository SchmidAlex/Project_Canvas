class Supernova {
    /**
     * Constructor of the supernova
     * @param {Size of the supernova} size 
     * @param {Color of the supernova} color 
     * @param {Canvas object} canvas 
     * @param {Durartion of the supernova to appear in space} livingTime
     */
    constructor(size, color, canvas, livingTime) {
      this.size = size;
      this.color = color;

      // The x Position and y Position of the supernova random calculated based on the canvas dimensions
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);

     // Integer for the living time which is on 0 per default
      this.livingTime = livingTime;
    }

    /**
     * Draw function of the supernova class
     * @param {Ctx object} ctx 
     */
    draw(ctx) {
      
      // Set color based on parameter given when initialising supernova class
      ctx.fillStyle = this.color;
      ctx.beginPath();

      // Check if the living time of the supernova is already reached
      if(this.livingTime >= 0) {

        // Draw supernova
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);

        // Decrease living time by one
        this.livingTime--;
      }
      ctx.fill();
      ctx.closePath();
    }
  }