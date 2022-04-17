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
    function Particle(w, h, palette) {
        this.w = w;
        this.h = h;
        this.palette = palette;
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
        this.color = palette[GetRandomInt(0, palette.length)];
    }
    Particle.prototype.Update = function () {
        var dRadius = GetRandomFloat(-MaxParticleSize / 10, MaxParticleSize / 10);
        var dSpeed = GetRandomFloat(-0.01, 0.01);
        var dTheta = GetRandomFloat(-Math.PI / 8, Math.PI / 8);
        this.speed += dSpeed;
        this.theta += dTheta;
        var _a = FromPolar(this.speed, this.theta), dx = _a[0], dy = _a[1];
        this.x += dx;
        this.y += dy;
        this.radius += dRadius;
        this.radius += (this.radius < 0) ? -2 * dRadius : 0;
    };
    Particle.prototype.Draw = function (ctx) {
        ctx.save();
        this.experiment1(ctx);
        ctx.restore();
    };
    Particle.prototype.experiment1 = function (ctx) {
        ctx.fillStyle = this.color;
        var circle = new Path2D();
        circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill(circle);
    };
    return Particle;
}());
var ParticleCount = 200;
var ColorPalettes = [["#8A476D", "#E4E786", "#FB8D5F", "#5FFBB0", "#FB5F5F"], ["#B8A1A1", "#5D40B7", "#362B57", "#A8F887", "#87F8EB"], ["#0D0F0F", "#FFFFFF", "#2B5C5C", "#DCB932", "#9032DC"]];
var Simulation = /** @class */ (function () {
    function Simulation(width, height) {
        this.width = width;
        this.height = height;
        this.particles = [];
        this.palette = [];
        this.init = false;
        this.palette = ColorPalettes[GetRandomInt(0, ColorPalettes.length)];
        for (var i = 0; i < ParticleCount; i++) {
            this.particles.push(new Particle(this.width, this.height, this.palette));
        }
    }
    Simulation.prototype.Update = function () {
        this.particles.forEach(function (p) { return p.Update(); });
    };
    Simulation.prototype.Draw = function (ctx) {
        //imp this
        if (!this.init) {
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, this.width, this.height);
            this.init = true;
        }
        this.particles.forEach(function (p) { return p.Draw(ctx); });
    };
    return Simulation;
}());
function bootstrapper() {
    var width = 1700;
    var height = 700;
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
