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
        var supernovaLivingTime = 150;

        /**
         * Make all objects we need
         */
        /** @type {HTMLCanvasElement} */
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        var sun = new Sun(20, canvas); //size anpassen
        var asteroid = new Asteroid(asteroidSize, 10, canvas, asteroidColor);
        var shootingStar = new ShootingStar(shootingStarSize, 10, shootingStarColor, canvas, shootingStarLivingTime);
        var supernova = new Supernova(supernovaSize, supernovaColor, canvas, supernovaLivingTime);
        /**
         * Create objects we need
         */
        for (let i = 1; i <= planetCount; i++) {
            planets.push(new Planet(i * 50, canvas));//distanz anpassen (zur sonne)
        }

        /**
         * Create 300 stars
         */
        for (let i = 0; i < 300; i++) {
            stars.push(new Star(stars, starSize, canvas));
        }

        planets.forEach(planet => {
            //planet.setInterreactionVelocity(0.00000002);
            //planet.setOnHold();
        });

        /**
         * Declare x-position variables for mouseevents
         */
        var mouseDownPoint;
        var mouseUpPoint;
        var mouseTimeDown;
        var mouseTimeUp

        /**
         * Eventhandler for clicking in the canvas
         */
        document.getElementById('myCanvas').addEventListener('mousedown', function (e) {
            mouseDownPoint = e.clientX;
            mouseTimeDown = e.timeStamp;
            planets.forEach(planet => {
                planet.setOnHold();
            });
        });
    
        /**
         * Eventhandler for let go of the click
         */
        document.getElementById('myCanvas').addEventListener('mouseup', function (e) {
            mouseUpPoint = e.clientX;
            mouseTimeUp = e.timeStamp;
            planets.forEach(planet => {
                planet.breakOnHold();
                planet.setInterreactionVelocity(mouseDownPoint, mouseUpPoint, mouseTimeDown, mouseTimeUp);
            });
        });

        //Start the animation
        showFrame(canvas, ctx, sun, planets, stars, starColor, actualTime, asteroid, shootingStar, supernova);
    });
    
});
 
/**
 * Frametick function.
 * This function handles a frame in the canvas.
 * @param {Canvas to draw on it} canvas 
 * @param {CTX to draw} ctx 
 * @param {The sun of the solar system} sun 
 * @param {An array of planets in the solar system} planets 
 * @param {An array of visible stars in the solar system} stars 
 * @param {The color of the stars} starColor 
 * @param {The actual time we have from the requestAnimationFrame} actualTime 
 * @param {The asteroids objects that appear in space} asteroid 
 * @param {The shooting star object that appear in space} shootingStar 
 */
function showFrame(canvas, ctx, sun, planets, stars, starColor, actualTime, asteroid, shootingStar, supernova) {

    // We clear the whole canvas at firs
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // For every star in the array, we gona draw the star
    stars.forEach(star => {
        star.draw(ctx, starColor);
    });

    // Drawing the sun
    sun.draw(ctx);

    // Drawing the asteroid
    asteroid.draw(ctx);

    // Drawing the shooting star
    shootingStar.draw(ctx);

    // Drawing the supernova
    supernova.draw(ctx);
    
    // For every planet in the array, we gona draw the planet
    planets.forEach(planet => {
        planet.draw(ctx);
    });

    // Next tick
    window.requestAnimationFrame(function(actualTime) {
        showFrame(canvas, ctx, sun, planets, stars, starColor, actualTime, asteroid, shootingStar, supernova);
    });
}