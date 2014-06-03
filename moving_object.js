(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.checkForWrap = function(DIM_X, DIM_Y) {
    if (this.pos[0] > DIM_X + this.radius) {
      this.pos[0] = 0 - this.radius;
    } else if (this.pos[0] < 0 - this.radius) {
      this.pos[0] = DIM_X + this.radius;
    } else if (this.pos[1] > DIM_Y + this.radius) {
      this.pos[1] = 0 - this.radius;
    } else if (this.pos[1] < 0 - this.radius) {
      this.pos[1] = DIM_Y + this.radius;
    }
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var xDiff = Math.pow(this.pos[0] - otherObject.pos[0], 2);
    var yDiff = Math.pow(this.pos[1] - otherObject.pos[1], 2);
    var distance = Math.sqrt(xDiff + yDiff);

    return ((this.radius + otherObject.radius) > distance);
  };
})(this);