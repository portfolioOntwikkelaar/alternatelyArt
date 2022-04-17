"use strict";
function GetRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
function GetRandomInt(min, max) {
    return Math.floor(GetRandomFloat(min, max));
}
function FromPolar(v, theta) {
    return [v * Math.cos(theta), v * Math.sin(theta)];
}
var MaxParticleSize = 3;
var Particle = /** @class */ (function () {
    function Particle(w, h) {
        this.w = w;
        this.h = h;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.theta = 0;
        this.radius = 1.0;
        this.ttl = 500;
        this.lifetime = 500;
        this.color = 'black';
        this.x = GetRandomFloat(0, w);
        this.y = GetRandomFloat(0, h);
        this.speed = GetRandomFloat(0, 3.0);
        this.theta = GetRandomFloat(0, 2 * Math.PI);
        this.radius = GetRandomFloat(0.05, MaxParticleSize);
        this.lifetime = this.ttl = GetRandomInt(25, 50);
    }
    Particle.prototype.Update = function () {
        //imp this
    };
    Particle.prototype.Draw = function (ctx) {
        //imp this
    };
    return Particle;
}());
var ParticleCount = 200;
var Simulation = /** @class */ (function () {
    function Simulation(width, height) {
        this.width = width;
        this.height = height;
        this.particles = [];
        for (var i = 0; i < ParticleCount; i++) {
            this.particles.push(new Particle(this.width, this.height));
        }
    }
    Simulation.prototype.Update = function () {
        //imp this
    };
    Simulation.prototype.Draw = function (ctx) {
        //imp this
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, this.width, this.height);
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
