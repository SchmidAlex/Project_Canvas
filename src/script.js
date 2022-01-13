window.addEventListener('DOMContentLoaded', function(e) {
    /**
     * Make variables we need
     */
    var planetCount = 8;
    var planets = [];
    var stars = [];
    var sun = new Sun(2); //size anpassen

    /**
     * Create objects we need
     */
    for (let i = 0; i < planetCount; i++) {
        planets.push(new Planet());
    }

    for (let i = 0; i < 100; i++) {
        stars.push(new Star(stars));
    }

    //Start the animation
    window.requestAnimationFrame(function(actualTime) {
        showFrame(sun, planets, stars);
    });
});
 
 function showFrame(actualTime, duration, xStart, distance) {
     /** @type {HTMLCanvasElement} */
     let canvas = document.getElementById('myCanvas');
     let ctx = canvas.getContext('2d');
     
     let x = xStart + distance / duration * actualTime;
 
     ctx.clearRect(0, 0, canvas.width, canvas.height);
 
     ctx.beginPath();
     ctx.rect(x, 50, 100, 50);
     ctx.globalAlpha = 1;
     ctx.fillStyle = '#0f0';
     ctx.strokeStyle = '#060';
     ctx.fill();
     ctx.stroke();
 
     if(x > xStart + distance - 1){
         return;
     }
 
     window.requestAnimationFrame(function(actualTime){
         showFrame(actualTime, duration, xStart, distance);
     });
 }