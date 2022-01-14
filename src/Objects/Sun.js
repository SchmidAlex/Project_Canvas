class Sun {
    /**
     * 
     * @param {Size radios of the Sun} sizeRadius 
     * @param {Canvas object} canvas 
     */
    constructor(sizeRadius, canvas) {
      this.sizeRadius = sizeRadius;
      this.color = '#FDB813'
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
    }

    /**
     * Draw function of the sun class 
     * @param {Ctx object} ctx 
     */
    draw(ctx) {

      // Set color of the sun
      ctx.fillStyle = this.color;
      ctx.beginPath();

      // Draw sun
      ctx.arc(this.x, this.y, this.sizeRadius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    }
  }