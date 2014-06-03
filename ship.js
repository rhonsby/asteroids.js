(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function (pos) {
    this.pos = pos;
    this.dir = 0;
    this.vel = 0;
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
  };
  Asteroids.inherits(Asteroids.MovingObject, Ship);

  Ship.COLOR = 'green';
  Ship.RADIUS = 2;

  Ship.prototype.power = function (impulse) {
    if (this.vel < 2) {
      this.vel += impulse;
    }
  };

  Ship.prototype.changeDirection = function () {

  };

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] + 25 * Math.sin(15 + this.dir), this.pos[1] + 25 * Math.cos(15 + this.dir));
    ctx.lineTo(this.pos[0] + 25 * Math.sin(-15 + this.dir), this.pos[1] + 25 * Math.cos(-15 + this.dir));
    ctx.fill();
  };

  Ship.prototype.move = function () {
    var xOffset = this.vel * Math.sin(this.dir);
    var yOffset = this.vel * Math.cos(this.dir);

    this.pos[0] += xOffset;
    this.pos[1] += yOffset;
  };

  Ship.prototype.fireBullet = function () {
    if (this.vel > 0) {
      var x = this.pos[0];
      var y = this.pos[1];
      var normalizedVel;

      if(this.vel[0] < 1) {
        normalizedVel = 1;
      } else {
        normalizedVel = this.vel;
      }

      var shipX = normalizedVel * Math.sin(this.dir);
      var shipY = normalizedVel * Math.cos(this.dir);

      var xMag = Math.pow(shipX, 2);
      var yMag = Math.pow(shipY, 2);
      var shipMag = Math.sqrt(xMag + yMag);
      var bulletVelocity = [ (shipX / shipMag) * 15, (shipY / shipMag) * 15];

      var bullet = new Asteroids.Bullet([x, y], bulletVelocity);
      return bullet;
    }
  };
})(this);