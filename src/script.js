window.addEventListener('DOMContentLoaded', function(e) {
    /**
     * Make variables we need
     */
    var planetCount = 8;
    var planets = [];
    var stars = [];
    var sun = new Sun(10); //size anpassen

    /**
     * Create objects we need
     */
    for (let i = 0; i < planetCount; i++) {
        planets.push(new Planet());
    }

    for (let i = 0; i < 100; i++) {
        //stars.push(new Star(stars));
    }

    //Start the animation
    window.requestAnimationFrame(function(actualTime) {
        showFrame(sun);
    });
});
 

function showFrame(sun) {
    /** @type {HTMLCanvasElement} */
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    sun.draw(ctx, canvas);
}