class Supernova {
    /**
     * 
     * @param {size of the supernova} size 
     * @param {color of the supernova} color 
     * @param {canvas object} canvas 
     */
    constructor(size, color, canvas) {
      this.size = size;
      this.color = color;

      //the x Position and y Position of the supernova random calculated based on the canvas dimensions
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
    }

    draw(ctx) {
      //set color based on parameter given when initialising supernova class
      ctx.fillStyle = this.color;
      ctx.beginPath();

      //draw supernova
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }
  }