class Star {

    /**
     * 
     * @param {Empty array} stars 
     * @param {Size of the star} starSize 
     * @param {Canvas object} canvas 
     */
    constructor(stars, starSize, canvas) {

        // Random x and y position of the star based on the measures of the canvas
        var xPos = Math.floor(Math.random() * (canvas.width - 1)) + 1;
        var yPos = Math.floor(Math.random() * (canvas.height - 1)) + 1;

        // Check if the position isn't already taken by another star
        stars.forEach(star => {
            while (star.x + (starSize / 2) > xPos && star.x - (starSize / 2) < xPos 
                && star.y + (starSize / 2) > yPos && star.y - (starSize / 2) < yPos) {
                if (star.x + (starSize / 2) > xPos && star.x - (starSize / 2) < xPos) {
                    xPos = Math.floor(Math.random() * 100) + 1;
                } else{
                    yPos = Math.floor(Math.random() * 100) + 1;
                }
            }
        });

        this.x = xPos;
        this.y = yPos;
        this.starSize = starSize;
    }
    //color abweichung TODO
    draw(ctx, starColor) {
        ctx.beginPath();
        ctx.fillStyle = starColor;

        // Draw star
        ctx.arc(this.x, this.y, this.starSize, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
}