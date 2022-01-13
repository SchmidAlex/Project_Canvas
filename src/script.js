window.addEventListener('DOMContentLoaded', function(e) {
    var duration = 3000;
    var xStart = 0;
    var distance = 200;
 
    window.requestAnimationFrame(function(actualTime){
        showFrame(actualTime, duration, xStart, distance);
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