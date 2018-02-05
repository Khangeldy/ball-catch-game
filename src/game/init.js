import { getRandomInt } from './utils';

function drawScene() {
  const canvas = document.getElementById('game'),
        w = canvas.width = document.body.clientWidth,
        h = canvas.height = document.body.clientHeight,
        ctx = canvas.getContext('2d');

  let points = 0;
  // TODO: basketCount with new elements
  // TODO: shuffle array balls
  // TODO: touchStart
  // TODO: vibrate API

  let   baskets = ['orange', 'gray', 'red', 'brown', 'blue', 'yellow', 'indigo', 'aqua', 'purple', 'green', 'magenta'],
        basketDirection = 0;
  const basketCount = baskets.length,
        basketHeight = 60,
        basketGap = 200,
        basketWidth = 60,
        basketFullWidth = basketGap * basketCount;

  const ballCount = 12;
  let   ballCounter = ballCount;
  const /*ballsAtSameTime = 3,*/
    b3 = Math.round(ballCount / 3),
    /*ballSpeedBase = 2,*/
    ballTypes = [
      'red',
      'orange',
      'brown',
      'orange',
      'blue',
      'red',
      'yellow',
      'yellow',
      'blue',
      'orange',
      'brown',
      'red'
];

  let rightPressed = false,
      leftPressed = false,
      mousePressed = false,
      mouseXStart = null,
      mouseXDiff = null;

  let touchPressed = false,
      touchXStart = null,
      touchXDiff = null;

  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, 0, w, h);

  // const promise = loadAssets();
  // promise.then(loaded).catch(err => {
  //   console.warn(err);
  // })

  loaded();
  function loaded() {

    const ball = {
      x: getRandomInt(w - 60),
      y: 0,
      width: 60,
      height: 60,
      completed: false,
      type: ballTypes[0],
      reset: function() {
        this.x = getRandomInt(w - 60);
        this.y = 0;
        this.completed = false;
        this.type = ballTypes[ballTypes.length - ballCounter];
      },
      draw: function() {
        // ctx.drawImage(images[0].img, this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.type;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const basketType = {
      width: basketWidth,
      height: basketHeight,
      x: 0,
      oldX: null,
      get y() {
        return h - this.height;
      },
      type: baskets[0],
      draw: function() {
        ctx.fillStyle = this.type;

        ctx.fillRect(this.x, this.y, this.width, this.height);
        const aw = basketFullWidth > w ? basketFullWidth : w;

        if(this.x < 0 || this.x + this.width > aw) {
          let xx;
          if(this.x < 0) {
            xx = this.x + aw;
          } else if(this.x + this.width > aw) {
            xx = this.x - aw;
          }
          ctx.fillRect(xx, this.y, this.width, this.height);
          if(this.x + this.width < 0) {
            this.x = this.x + aw;
          } else if(this.x >= aw) {
            this.x = this.x - aw;
          }
        }
      }
    }

    for(let i = 0; i < basketCount; i++) {
      baskets[i] = Object.assign({}, basketType, {x: i * basketGap, type: baskets[i]});
      baskets[i].draw();
    }

    // drawPaddle();

    ball.draw();

    animate();

    function animate() {
      ctx.clearRect(0, 0, w, h);
      requestAnimationFrame(animate);
      if(!ball.completed) {
        if(ball.y < h - 60) {
          ball.y += 6 / ((ballCounter + (b3 - 1)) / b3);
        } else {
          // TODO: Change this code if ball is image
          // const checkIn = ball.x + ball.width / 2;
          const checkIn = ball.x;
          for(let i = 0, s = baskets.length; i < s; i++) {
            const b = baskets[i];
            if(b.type === ball.type && b.x < checkIn && b.x + b.width > checkIn) {
              points++;
              break;
            } else {
              navigator.vibrate(500);
            }
          }
          ball.completed = true;
          ballCounter--;
          if(ballCounter > 0) {
            ball.reset();
          }
        }
      }

      if(rightPressed) {
          basketDirection = 5;
      } else if(leftPressed) {
          basketDirection = -5;
      }

      if(!ball.completed) {
        ball.draw();
      }

      for(let i = 0, ii = baskets.length; i < ii; i++) {
        if(rightPressed || leftPressed) {
          baskets[i].x += basketDirection;
        }
        baskets[i].draw();
      }

      drawPoints();
    }

    function drawPoints () {
      ctx.font = '48px serif';
      ctx.fillStyle = 'lightblue';
      ctx.fillText('Очко:' + points, w - 200, 70);
    }

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    document.addEventListener('mousedown', mouseDownHandler, false);
    document.addEventListener('mousemove', mouseMoveHandler, false);
    document.addEventListener('mouseup', mouseUpHandler, false);
    document.addEventListener('touchstart', touchStartHandler, false);
    document.addEventListener('touchmove', touchMoveHandler, false);
    document.addEventListener('touchend', touchEndHandler, false);

    function keyDownHandler(e) {
      if(e.keyCode === 39) {
        rightPressed = true;
      }
      else if(e.keyCode === 37) {
        leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if(e.keyCode === 39) {
        rightPressed = false;
      } else if(e.keyCode === 37) {
        leftPressed = false;
      }
    }

    function mouseDownHandler(e) {
      mousePressed = true;
      mouseXStart = e.clientX;
      // console.log(mouseXStart);

      for(let i = 0, ii = baskets.length; i < ii; i++) {
        baskets[i].oldX = baskets[i].x;
      }
    }
    function mouseUpHandler(e) {
      mousePressed = false;
      mouseXStart = null;
      mouseXDiff = null;
      for(let i = 0, ii = baskets.length; i < ii; i++) {
        baskets[i].oldX = null;
      }
    }
    function mouseMoveHandler(e) {
      if(mousePressed) {
        mouseXDiff = e.clientX - mouseXStart;

        // console.log(mouseXDiff);
        for(let i = 0, ii = baskets.length; i < ii; i++) {
          baskets[i].x = baskets[i].oldX + mouseXDiff;
        }
      }
    }

    function touchStartHandler(e) {
      touchPressed = true;
      touchXStart = e.touches[0].clientX;

      for(let i = 0, ii = baskets.length; i < ii; i++) {
        baskets[i].oldX = baskets[i].x;
      }
    }

    function touchMoveHandler(e) {
      if(touchPressed) {
        touchXDiff = e.changedTouches[0].clientX - touchXStart;

        for(let i = 0, ii = baskets.length; i < ii; i++) {
          baskets[i].x = baskets[i].oldX + touchXDiff;
        }
      }
    }

    function touchEndHandler(e) {
      touchPressed = false;
      touchXStart = null;
      touchXDiff = null;

      for(let i = 0, ii = baskets.length; i < ii; i++) {
        baskets[i].oldX = null;
      }
    }
  }
}

function init() {
  drawScene();
}

// https://stackoverflow.com/questions/20263954/make-a-bitmap-wrap-around-the-canvas-for-infinite-scrolling
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Paddle_and_keyboard_controls
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors


export default init;
