(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.inherits = function (parent, child) {
    function Surrogate(){}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  var Asteroid = Asteroids.Asteroid = function (pos, vel) {
    this.pos = pos;
    this.vel = this.randomVel();
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
  };
  Asteroids.inherits(Asteroids.MovingObject, Asteroid);

  Asteroid.COLOR = 'white';
  Asteroid.RADIUS = 25;

  Asteroid.randomAsteroid = function (dimX, dimY) {
    var x = Math.floor(Math.random() * (dimX + 1));
    var y = Math.floor(Math.random() * (dimY + 1));
    var pos = [x, y];
    return new Asteroid(pos);
  };

  Asteroid.prototype.randomVel = function () {
    var x = Math.random() * (1 - 1 + 0.5) - 1 * (Math.random() * 2 - 0.5);
    var y = Math.random() * (1 - 1 + 0.5) - 1 * (Math.random() * 2 - 0.5);
    return [x, y];
  };

})(this);