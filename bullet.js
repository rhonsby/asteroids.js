(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, vel) {
    this.pos = pos;
    this.vel = vel;
    this.color = Bullet.COLOR;
    this.radius = Bullet.RADIUS;
  };
  Asteroids.inherits(Asteroids.MovingObject, Bullet);
  Bullet.COLOR = 'yellow';
  Bullet.RADIUS = 3;

  Bullet.prototype.hitAsteroids = function (game) {
    var bullet = this;
    game.asteroids.forEach(function (asteroid) {
      if (bullet.isCollidedWith(asteroid)) {
        var idx = game.asteroids.indexOf(asteroid);
        game.asteroids.splice(idx, 1);

        idx = game.bullets.indexOf(bullet);
        game.bullets.splice(idx, 1);
      }
    });
  };

})(this);