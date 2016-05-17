(function() {
    'use strict';

    var CANVAS_ID = 'mainCanvas';

    var canvasElement = document.getElementById(CANVAS_ID);
    var ctx = canvasElement.getContext('2d');


    window.addEventListener('load', function () {
        canvasElement.width = window.innerWidth;
        canvasElement.height = window.innerHeight;

        setupCanvasContext(ctx);

        play(canvasElement, ctx);
    });

    window.addEventListener('resize', function () {
        canvasElement.width = window.innerWidth;
        canvasElement.height = window.innerHeight;

        setupCanvasContext(ctx);
    });

    function setupCanvasContext (ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.strokeStyle = '#CCC';
    }

    function play (canvasElement, ctx) {
        var angle = 0.0,
            angleArg = 4.0;

        var ratio = 1.0,
            ratioArg = 1.5;



        var now = performance.now();

        function draw(curr) {
            var dt = (curr - now) / 1000;
            now = curr;

            ratio += ratioArg * dt;

            if (ratio < 0.5) {
                ratio = 0.5;
                ratioArg = -ratioArg;
            }
            else if (ratio > 2.5) {
                ratio = 2.5;
                ratioArg = -ratioArg;
            }


            angle += angleArg * dt;

            if (angle > Math.PI) {
                angle -= Math.PI;
            }

            // console.log('Ratio: ' + ratio);
            // console.log('Angle: ' + angle);

            var SIZE = Math.min(canvasElement.width, canvasElement.height) * 0.25;

            ctx.save();

            ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

            ctx.translate(canvasElement.width / 2, canvasElement.height / 2);
            ctx.rotate(angle);

            ctx.scale(ratio, ratio);
            ctx.strokeRect(-SIZE * 0.5, -SIZE * 0.5, SIZE, SIZE);

            ctx.restore();


            requestAnimationFrame(draw);
        }


        requestAnimationFrame(draw);
    }

})();
