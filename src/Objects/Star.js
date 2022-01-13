class Star {
    constructor(stars) {

        xPos = Math.floor(Math.random() * 100) + 1;
        yPos = Math.floor(Math.random() * 100) + 1;

        stars.forEach(star => {
            while (star.x == xPos && star.y == yPos) {
                if (star.x == xPos) {
                    xPos = Math.floor(Math.random() * 100) + 1;
                } else{
                    yPos = Math.floor(Math.random() * 100) + 1;
                }
            }
        });

        this.xPosition = xPos;
        this.yPosition = xPos;
        this.size = Math.floor(Math.random() * 100) + 1;
    }

    draw() {
        
    }
  }