class Star {
    constructor(stars, starSize) {

        var xPos = Math.floor(Math.random() * 999) + 1;
        var yPos = Math.floor(Math.random() * 999) + 1;

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

        this.xPosition = xPos;
        this.yPosition = yPos;
        this.starSize = starSize;
    }

    draw(ctx, starColor) {
        ctx.beginPath();
        ctx.fillStyle = starColor;
        ctx.arc(this.xPosition, this.yPosition, this.starSize, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
}