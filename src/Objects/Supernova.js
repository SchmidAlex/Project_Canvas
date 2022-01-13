class Supernova {
    /**
     * Constructor of the supernova
     * @param {Size of the supernova} size 
     * @param {Color of the supernova} color 
     * @param {Canvas object} canvas 
     */
    constructor(size, color, canvas) {
      this.size = size;
      this.color = color;

      // The x Position and y Position of the supernova random calculated based on the canvas dimensions
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
    }

    draw(ctx) {
      // Set color based on parameter given when initialising supernova class
      ctx.fillStyle = this.color;
      ctx.beginPath();

      // Draw supernova
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }
  }