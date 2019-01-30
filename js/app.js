// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/mario-enemy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

  };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

//Enemy loop and speed
  if (this.x < 505) {
    this.x +=  this.speed * dt;

  } else {
    this.x = -50;
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


  //Hero Class
  class Hero {
    constructor() {
      this.x = 200;
      this.y = 450;
      this.sprite = 'images/char-mario.png';

    }

    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


    //Move Hero using input
    handleInput(input) {
      switch(input) {
        case 'left' :
          if (this.x > 0) {
            this.x -= 50;
          };
            break;
        case 'right' :
          if (this.x < 400) {
            this.x += 50;
          };
            break;
        case 'up' :
          if (this.y > 10) {
            this.y -= 50;
          };
            break;
        case 'down' :
          if (this.y < 480) {
            this.y += 50;
          };
            break;
      }
    }


    update() {

      for (let enemy of allEnemies) {
        const calcX = enemy.x + 100 > this.x && enemy.x < this.x;
        const calcY = this.y - 50 === enemy.y || this.y === enemy.y;

        if (calcX && calcY) {
            this.x = 200;
            this.y = 450;
            life--;
        }
      }

      if (this.y === 0) {
        this.score();
      }
      //ScoreHTML
      document.getElementById('score').innerHTML = score;
    }


    //Add 1 score after reaching the See
    score() {
      this.x = 200;
      this.y = 450;
      score += 1;
      //Increase Enemy Speed
      for(let enemy of allEnemies) {
        enemy.speed += Math.floor(Math.random() * 50 + 35);
      }
    }

    // Reset Game after Game Over and pressed the Replay button
    reset() {
      document.getElementById('myModal').style.display = 'none';

      for(let enemy of allEnemies) {
        enemy.speed = 100;
      }
      this.x = 200;
      this.y = 450;
      score = 0;
      life = 5;
    }
  }


  //Player Score Point
  let score = 0;
  //Player Life Amount
  let life = 5;

  //Player Object
  const player = new Hero();

  //Enemy objects
  const allEnemies = [
    new Enemy(-50,50,100),
    new Enemy(-150,150,100),
    new Enemy(-100,250, 100)
  ];

  // This listens for key presses and sends the keys to your

  document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });
