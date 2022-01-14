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

      // Counter for the living time
      this.ticker = 0;
      this.livingTime = livingTime;
    }

    draw(ctx) {
      // Set color based on parameter given when initialising supernova class
      ctx.fillStyle = this.color;
      ctx.beginPath();

      // Check if the living time of the supernova is already reached
      if(this.ticker <= this.livingTime) {

        // Draw supernova
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        
        // Increase position for moving effect when supernova is redrawing itself
        this.x += 1;
        this.y += 1;

        // Increase counter
        this.ticker += 1;
      }


      // Draw supernova
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }
  }