(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(20);
    this.ship = new Asteroids.Ship(Game.CENTER_POS);
    this.bullets = [];
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

    game.bullets.forEach(function (bullet) {
      bullet.draw(game.ctx);
    });

    game.ship.draw(game.ctx);
  };

  Game.prototype.move = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });

    this.bullets.forEach(function (bullet) {
      bullet.move();
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
    var game = this;

    this.move();
    this.checkForWrap();
    this.draw();
    this.checkCollisions();

    if (key.isPressed(38)) {
      game.ship.power(0.1);
    }

    if (key.isPressed(37)) {
      game.ship.dir += 0.015;
    }

    if (key.isPressed(39)) {
      game.ship.dir -= 0.015;
    }
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    game.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(game.ship)) {
        game.stop();
        alert('Game over!');
      }
    });

    game.bullets.forEach(function (bullet) {
      bullet.hitAsteroids(game);
    });
  };

  Game.prototype.fireBullet = function () {
    var bullet = this.ship.fireBullet();
    if (bullet) this.bullets.push(bullet);
  };

  Game.prototype.stop = function () {
    window.clearInterval(this.interval);
  };

  Game.prototype.start = function () {
    var game = this;

    $(document).ready(function () {
      $(document).on('keyup', function (e) {
        if (e.keyCode === 32) game.fireBullet();
      });
    });

    game.interval = setInterval(function () {
      game.step();
    }, game.FPS);
  };
})(this);