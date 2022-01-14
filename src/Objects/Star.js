class Star {

    /**
     * 
     * @param {Empty array} stars 
     * @param {Size of the star} starSize 
     * @param {Canvas object} canvas
     * @param {Color of the star} starColor
     */
    constructor(stars, starSize, canvas, starColor, starShadowColor, starShadowBlur) {

        // Random x and y position of the star based on the measures of the canvas
        var xPos = Math.floor(Math.random() * (canvas.width - 1)) + 1;
        var yPos = Math.floor(Math.random() * (canvas.height - 1)) + 1;

        // For every star, we already have we check the x and y position (with the width and height of the star), to the new star and if so we will calculate a new star position for the new star
        stars.forEach(star => {
            while (star.x + (starSize / 2) > xPos && star.x - (starSize / 2) < xPos 
                && star.y + (starSize / 2) > yPos && star.y - (starSize / 2) < yPos) {

                // Check if the x position of the stare is on the x position of another star
                if (star.x + (starSize / 2) > xPos && star.x - (starSize / 2) < xPos) {
                    
                    // Generate a new x position of the new star
                    xPos = Math.floor(Math.random() * 100) + 1;
                } else {

                    // Generate a new y position of the new star
                    yPos = Math.floor(Math.random() * 100) + 1;
                }
            }
        });

        /**
         * Variabledeclaration of the star
         */
        this.x = xPos;
        this.y = yPos;
        this.starSize = starSize;
        this.starColor = starColor;
        this.starShadowColor = starShadowColor;
        this.starShadowBlur = starShadowBlur;
    }
    
    /**
     * Draw function of the star class
     * @param {Ctx object} ctx 
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.starColor;

        // Draw star
        ctx.arc(this.x, this.y, this.starSize, 0, 2 * Math.PI, false);
        ctx.shadowColor = this.starShadowColor;
        ctx.shadowBlur = this.starShadowBlur;
        ctx.fill();
        ctx.closePath();
        ctx.shadowColor = 'transparent';
    }
}