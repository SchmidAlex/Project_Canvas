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
        var shootingStarLivingTime = 150;
        var supernovaSize = 15;
        var supernovaColor = '#ff0000';
        /** @type {HTMLCanvasElement} */
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        var sun = new Sun(20, canvas); //size anpassen
        var asteroid = new Asteroid(asteroidSize, 10, canvas, asteroidColor);
        var shootingStar = new ShootingStar(shootingStarSize, 10, shootingStarColor, canvas, shootingStarLivingTime);
        var supernova = new Supernova(supernovaSize, supernovaColor, canvas);
        /**
         * Create objects we need
         */
        for (let i = 1; i <= planetCount; i++) {
            planets.push(new Planet(i * 50, canvas));//distanz anpassen (zur sonne)
        }

        for (let i = 0; i < 300; i++) {
            stars.push(new Star(stars, starSize, canvas));
        }

        planets.forEach(planet => {
            //planet.setInterreactionVelocity(0.00000002);
            //planet.setOnHold();
        });

        document.getElementById('myCanvas').addEventListener('mousedown', function (e) {
            planets.forEach(planet => {
                console.log('test');
                planet.setOnHold();
            });
        });
    
        document.getElementById('myCanvas').addEventListener('mouseup', function (e) {
            planets.forEach(planet => {
                console.log('test');
                planet.breakOnHold();
            });
        });

        //Start the animation
        showFrame(canvas, ctx, sun, planets, stars, starColor, actualTime, asteroid, shootingStar, supernova);
    });
    
});
 

function showFrame(canvas, ctx, sun, planets, stars, starColor, actualTime, asteroid, shootingStar, supernova) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.draw(ctx, starColor);
    });

    sun.draw(ctx);

    asteroid.draw(ctx);

    shootingStar.draw(ctx);

    supernova.draw(ctx);

    planets.forEach(planet => {
        planet.draw(ctx);
    });


    window.requestAnimationFrame(function(actualTime) {
        showFrame(canvas, ctx, sun, planets, stars, starColor, actualTime, asteroid, shootingStar, supernova);
    });
}