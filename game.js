(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(20);
    this.ship = new Asteroids.Ship(Game.CENTER_POS);
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 800;
  Game.CENTER_POS = [Game.DIM_X / 2, Game.DIM_Y / 2];
  Game.FPS = 60;

  Game.prototype.addAsteroids = function (numAsteroids) {
    var asteroids = [];
    var asteroid;

    for (var i = 0; i < numAsteroids; i++) {
      asteroid = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y);
      asteroids.push(asteroid);
    }

    return asteroids;
  };

  Game.prototype.draw = function () {
    var game = this;

    game.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    game.ctx.setFillColor('black');
    game.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    game.asteroids.forEach(function (asteroid) {
      asteroid.draw(game.ctx);
    });

    game.ship.draw(game.ctx);
  };

  Game.prototype.move = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });

    this.ship.move();
  };

  Game.prototype.step = function () {
    this.move();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    game.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(game.ship)) {
        debugger
        game.stop();
        alert('Game over!');
      }
    });
  };

  Game.prototype.stop = function () {
    window.clearInterval(this.interval);
  };

  Game.prototype.start = function () {
    var game = this;

    game.interval = setInterval(function () {
      game.step();
    }, game.FPS);
  };
})(this);