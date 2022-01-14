class Sun {
    /**
     * 
     * @param {Size radios of the Sun} sizeRadius 
     * @param {Canvas object} canvas 
     */
    constructor(sizeRadius, canvas, color, shadowColor, shadowBlur) {
      this.sizeRadius = sizeRadius;
      this.color = color;
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.shadowColor = shadowColor;
      this.shadowBlur = shadowBlur;
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
      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = this.shadowBlur;
      ctx.fill();
      ctx.closePath();
      ctx.shadowColor = 'transparent';
    }
  }