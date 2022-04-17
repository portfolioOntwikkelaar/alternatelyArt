"use strict";
var Simulation = /** @class */ (function () {
    function Simulation(width, height) {
        this.width = width;
        this.height = height;
    }
    Simulation.prototype.Update = function () {
        //imp this
    };
    Simulation.prototype.Draw = function (ctx) {
        //imp this
    };
    return Simulation;
}());
function bootstrapper() {
    var width = 400;
    var height = 400;
    var updateFrameRate = 50;
    var renderFrameRate = 50;
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    if (!canvas)
        return;
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    var sim = new Simulation(width, height);
    setInterval(function () { sim.Update(); }, 1000 / updateFrameRate);
    setInterval(function () { sim.Draw(ctx); }, 1000 / renderFrameRate);
}
bootstrapper();
