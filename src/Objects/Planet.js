class Planet {
    constructor() {
      this.sizeRadius = Math.floor(Math.random() * 100) + 1;;
      this.velocity = Math.floor(Math.random() * 100) + 1;;
      this.distanceRadius = Math.floor(Math.random() * 100) + 1;;
      this.color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
    }

    draw() {
        
    }
}