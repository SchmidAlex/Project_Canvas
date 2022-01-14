
// EventListener when the dom content is loaded
window.addEventListener('DOMContentLoaded', function(e) {

    // First animation step
    window.requestAnimationFrame(function(actualTime) {
        
        /**
         * Make variables we need
         */
        var planetCount = 8;
        var distancePlanetToSun = 50;
        var planets = [];
        var stars = [];
        var starSize = 1;
        var starColor = '#fff';
        var asteroidSize = 10;
        var asteroidColor = "#964B00";
        const asteroidLivingTime = false;
        var shootingStarSize = 5;
        var shootingStarColor = '#fff';
        const initialShootingStarLivingTime = 0;
        var supernovaSize = 15;
        var supernovaColor = '#ff0000';
        const initialSupernovaLivingTime = 0;
        var sunSize = 20;
        var sunColor = '#fdb813';
        var sunShadowColor = '#fdb813';
        var sunShadowBlur = 35;

        /**
         * Make all objects we need
         */
        /** @type {HTMLCanvasElement} */
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        var sun = new Sun(sunSize, canvas, sunColor, sunShadowColor, sunShadowBlur);
        var asteroid = new Asteroid(asteroidSize, 10, asteroidColor, asteroidLivingTime);
        var shootingStar = new ShootingStar(shootingStarSize, 10, shootingStarColor, canvas, initialShootingStarLivingTime);
        var supernova = new Supernova(supernovaSize, supernovaColor, canvas, initialSupernovaLivingTime);
        /**
         * Create planets we need
         */
        for (let i = 1; i <= planetCount; i++) {
            planets.push(new Planet(i * distancePlanetToSun, canvas));//distanz anpassen (zur sonne)
        }

        /**
         * Create 300 stars
         */
        for (let i = 0; i < 300; i++) {
        var starColor = '#fff';
            stars.push(new Star(stars, starSize, canvas, starColor));
        }

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

            //Get the x position of the click and the time
            mouseDownPoint = e.clientX;
            mouseTimeDown = e.timeStamp;

            // For every planet we set the boolean onHold on true
            planets.forEach(planet => {
                planet.setOnHold(mouseTimeDown);
            });
        });
    
        /**
         * Eventhandler for let go of the click
         */
        document.getElementById('myCanvas').addEventListener('mouseup', function (e) {

            // Get the x poistion, when the mouse was released and its time
            mouseUpPoint = Math.floor(e.clientX);
            mouseTimeUp = Math.floor(e.timeStamp);

            // Check if the Mouse were dragged left or right
            if(mouseDownPoint < mouseUpPoint){

                // For every planet break hold status and create an interreaction velocity
                planets.forEach(planet => {
                    planet.breakOnHold(mouseTimeUp);
                    planet.setInterreactionVelocity(mouseDownPoint, mouseUpPoint, mouseTimeDown, mouseTimeUp);
                });
            } else {

                // For every planet break hold status and create an interreaction velocity
                planets.forEach(planet => {
                    planet.breakOnHold(mouseTimeUp);
                    planet.setInterreactionVelocity(mouseUpPoint, mouseDownPoint, mouseTimeDown, mouseTimeUp);
                });
            }
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

    // time for the shooting star to appear
    var shootingStarLivingTime = 150;

    // time for the supernova to appear
    var supernovaLivingTime = 80;

    // We clear the whole canvas at firs
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // For every star in the array, we gona draw the star
    stars.forEach(star => {
        star.draw(ctx, starColor);
    });

    // Drawing the sun
    sun.draw(ctx);    

    // Random event to launch the drawing of a asteroid
    if (Math.random() <= 0.005 && !asteroid.livingTime) {

        // Reposition the spawnpoint of the asteroid everytime a "new" one gets drawn
        asteroid.changeSides(canvas);
        
        // Set the living time to true to make the asteriod draw itself in the next step
        asteroid.livingTime = true;
    }

    // If the random event above takes place the asteroid gets drawn
    if(asteroid.livingTime) {

        // Drawing the asteroid
        asteroid.draw(ctx, canvas);
    }
    
    // Random event to launch the drawing of a shooting star
    if (Math.random() <= 0.009 && shootingStar.livingTime == 0) {

        // Set the living time of the shooting star 
        shootingStar.livingTime = shootingStarLivingTime;

        // Reposition the spawnpoint of the shooting star everytime a "new" one gets drawn
        shootingStar.x = Math.floor(Math.random() * canvas.width);
        shootingStar.y = Math.floor(Math.random() * canvas.height);
    }

    // If the random event above took place a shooting star gets drawn
    if(shootingStar.livingTime > 0) {

        // Drawing the shooting star
         shootingStar.draw(ctx);
    }
    
    // Random event to launch the drawing of a supernova
    if (Math.random() <= 0.004 && supernova.livingTime == 0) {

        // Set the living time of the supernova
        supernova.livingTime = supernovaLivingTime;

        // Reposition the spawnpoint of the supernova everytime a "new" one gets drawn
        supernova.x = Math.floor(Math.random() * canvas.width);
        supernova.y = Math.floor(Math.random() * canvas.height);
    }

    // If the random event above took place a supernova gets drawn
    if(supernova.livingTime > 0) {

        // Drawing the supernova
        supernova.draw(ctx);
    }

    // For every planet in the array, we gona draw the planet
    planets.forEach(planet => {
        planet.draw(ctx, actualTime);
    });

    // Next tick
    window.requestAnimationFrame(function(actualTime) {
        showFrame(canvas, ctx, sun, planets, stars, starColor, actualTime, asteroid, shootingStar, supernova);
    });
}