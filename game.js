(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(20);
    this.ship = new Asteroids.Ship(Game.CENTER_POS);
  };

  Game.DIM_X = window.innerWidth;
  Game.DIM_Y = window.innerHeight;
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
    game.ctx.setFillColor('#111111');
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

  Game.prototype.checkForWrap = function () {
    var game = this;
    game.asteroids.forEach(function (asteroid) {
      asteroid.checkForWrap(Game.DIM_X, Game.DIM_Y);
    });
    game.ship.checkForWrap(Game.DIM_X, Game.DIM_Y);
  };

  Game.prototype.step = function () {
    this.move();
    this.checkForWrap();
    this.draw();
    // this.checkCollisions();
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    game.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(game.ship)) {
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
    game.bindKeyHandlers();

    game.interval = setInterval(function () {
      game.step();
    }, game.FPS);
  };

  Game.prototype.bindKeyHandlers = function () {
    var game = this;

    key('left', function () {
      game.ship.dir += 0.1;
    });

    key('up', function () {
      if (game.ship.vel < 2) {
        game.ship.power(0.2);
      }
    });

    key('right', function () {
      // change dir
      game.ship.dir -= 0.1;
    });

    key('down', function () {
      if (game.ship.vel > -2) {
        game.ship.power(-0.1);
      }
    });
  };
})(this);