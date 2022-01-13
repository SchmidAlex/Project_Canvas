window.addEventListener('DOMContentLoaded', function(e) {

    window.requestAnimationFrame(function(actualTime) {
        /**
         * Make variables we need
         */
        var planetCount = 8;
        var planets = [];
        var stars = [];
        var starSize = 1;
        var starColor = '#fff';
        var asteroidSize = 10;
        var asteroidColor = "#964B00";
        var shootingStarSize = 5;
        var shootingStarColor = '#fff';
        /** @type {HTMLCanvasElement} */
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        var sun = new Sun(20, canvas); //size anpassen
        var asteroid = new Asteroid(asteroidSize, 10, canvas, asteroidColor);
        var shootingStar = new ShootingStar(shootingStarSize, 10, shootingStarColor)
        /**
         * Create objects we need
         */
        for (let i = 1; i <= planetCount; i++) {
            planets.push(new Planet(i * 50, canvas));//distanz anpassen (zur sonne)
        }

        for (let i = 0; i < 300; i++) {
            stars.push(new Star(stars, starSize, canvas));
        }

        //Start the animation
        showFrame(canvas, ctx, sun, planets, stars, starColor, actualTime, asteroid, shootingStar);
    });
    
});
 

function showFrame(canvas, ctx, sun, planets, stars, starColor, actualTime, asteroid, shootingStar) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.draw(ctx, starColor);
    });

    sun.draw(ctx);

    asteroid.draw(ctx);

    shootingStar.draw(ctx);

    planets.forEach(planet => {
        planet.draw(ctx);
    });


    window.requestAnimationFrame(function(actualTime) {
        showFrame(canvas, ctx, sun, planets, stars, starColor, actualTime, asteroid, shootingStar);
    });
}