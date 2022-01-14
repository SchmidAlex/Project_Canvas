class ShootingStar {
  
    /**
     * Constructor of the shooting star
     * @param {Size of the shooting star in pixel} size 
     * @param {Velocity of the shooting star} velocity 
     * @param {Color of the shooting star} color 
     * @param {Canvas sbject} canvas 
     * @param {Duration of the shooting star to appear in space} livingTime 
     */
    constructor(size, velocity, color, canvas, livingTime, shootingStarShadowColor, shootingStarShadowBlur) {
      this.size = size;
      this.velocity = velocity;
      this.color = color;
      this.shootingStarShadowColor = shootingStarShadowColor;
      this.shootingStarShadowBlur = shootingStarShadowBlur;

      // The x Position and y Position for the shooting star to appear. Random calculated based on the canvas dimensions
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      
      // Integer for the living time which is on 0 per default
      this.livingTime = livingTime;
      
    }

    /**
     * Draw function of the shooting star class
     * @param {Ctx object} ctx 
     */
    draw(ctx) {

        // Set color based on parameter given when initialising shooting star class
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        // Draw shooting star
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        
        // Increase position for moving effect when shooting star is redrawing itself
        this.x += 1;
        this.y += 1;

        // Decrease living time by one
        this.livingTime--;

        ctx.shadowColor = this.shootingStarShadowColor;
        ctx.shadowBlur = this.shootingStarShadowBlur;
        ctx.fill();
        ctx.closePath();
        ctx.shadowColor = 'transparent';
    }
  }