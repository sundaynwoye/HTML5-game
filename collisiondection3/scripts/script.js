var canvas, ctx, width, height;
var ballArray = [];

function init() {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  
  // Change this number to get more balls
  createBalls(10);
 
  requestAnimationFrame(mainLoop);
}

function createBalls(numberOfBalls) {
  for(var i=0; i < numberOfBalls; i++) {
    
    // Create a ball with random position and speed
    var ball =  new Ball(width*Math.random(),
                          height*Math.random(),
                          (10*Math.random())-5,
                          (10*Math.random())-5,
                          40); // radius, change if ou like.
    
    // Add it to the array
    ballArray[i] = ball;
  }
  
}                                

function mainLoop() {
    // vasClear the can
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // uncomment for blur effect, comment previous line
   //ctx.fillStyle = "rgba(0, 240, 240, 0.2)";
  //ctx.fillRect (0, 0, width, height);
  //ctx.fillStyle='black';
  
    // For each ball in the array
    for(var i=0; i < ballArray.length; i++) {
      var balle = ballArray[i];
      
      // 1) Move the ball
      balle.move();   
  
      // 2) collision test with walls
      collisionTestWithWalls(balle);
  
      // 3) draw the ball
      balle.draw();
  }
  
  collisionTestBetweenBalls();
  
    // Ask for new animation frame
     window.requestAnimationFrame(mainLoop);
}
 
function collisionTestWithWalls(ball) {
    if (ball.x < ball.rayon) {
        ball.x = ball.rayon;
        ball.vx *= -1;
    } 
    if (ball.x > width - (ball.rayon)) {
        ball.x = width - (ball.rayon);
        ball.vx *= -1;
    }     
    if (ball.y < ball.rayon) {
        ball.y = ball.rayon;
        ball.vy *= -1;
    }     
    if (ball.y > height - (ball.rayon)) {
        ball.y = height - (ball.rayon);
        ball.vy *= -1;
    }
}

function collisionTestBetweenBalls() {  
  var balls = ballArray;
  
  for (var i = 0; i < ballArray.length; i++) {
        for (var j = i + 1; j < ballArray.length; j++) {
            var dx = balls[j].x - balls[i].x;
            var dy = balls[j].y - balls[i].y;
          
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (balls[j].rayon + balls[i].rayon)) {
                // balls have contact so push back...
                var normalX = dx / dist;
                var normalY = dy / dist;
                var middleX = (balls[i].x + balls[j].x) / 2;
                var middleY = (balls[i].y + balls[j].y) / 2;
              
                balls[i].x = middleX - normalX * balls[i].rayon;
                balls[i].y = middleY - normalY * balls[i].rayon;
                balls[j].x = middleX + normalX * balls[j].rayon;
                balls[j].y = middleY + normalY * balls[j].rayon;
              
                var dVector = (balls[i].vx - balls[j].vx) * normalX;
                dVector += (balls[i].vy - balls[j].vy) * normalY;
                var dvx = dVector * normalX;
                var dvy = dVector * normalY;
              
                balls[i].vx -= dvx;
                balls[i].vy -= dvy;
                balls[j].vx += dvx;
                balls[j].vy += dvy;
            }
        }
    }
}

function Ball(x, y, vx, vy, diameter) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.rayon = diameter/2;
  
  this.draw = function() {
    ctx.beginPath();
      ctx.arc(this.x, this.y, this.rayon, 0, 2*Math.PI);
      ctx.fill();
  };
  
  this.move = function() {
    
    this.x += this.vx;
    this.y += this.vy;
  };
  
}

