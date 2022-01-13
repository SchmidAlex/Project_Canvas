window.addEventListener('DOMContentLoaded', function(e) {
    /**
     * Make variables we need
     */
    var planetCount = 8;
    var planets = [];
    var stars = [];
    var starSize = 1;
    var starColor = '#fff';
    var sun = new Sun(20); //size anpassen

    /**
     * Create objects we need
     */
    for (let i = 1; i <= planetCount; i++) {
        planets.push(new Planet(i * 50));
    }

    for (let i = 0; i < 300; i++) {
        stars.push(new Star(stars, starSize));
    }

    //Start the animation
    window.requestAnimationFrame(function(actualTime) {
        showFrame(sun, planets, stars, starColor);
    });
});
 

function showFrame(sun, planets, stars, starColor) {
    /** @type {HTMLCanvasElement} */
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    stars.forEach(star => {
        star.draw(ctx, starColor);
    });

    sun.draw(ctx, canvas);

    planets.forEach(planet => {
        planet.draw(ctx, canvas);
    });

}