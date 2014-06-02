(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function (pos) {
    this.pos = pos;
    this.vel = [0, 0];
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
  };
  Asteroids.inherits(Asteroids.MovingObject, Ship);

  Ship.COLOR = 'green';
  Ship.RADIUS = 15;
})(this);