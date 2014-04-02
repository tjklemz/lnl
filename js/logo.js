// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function() {
  var time;
  var t = 0;
  
  var c = document.getElementById("plaid-logo");
  var ctx = c.getContext("2d");
  
  var cX = c.width / 2;
  var cY = c.height / 2;
  
  var scale = 0.132;
  
  var bigBlueSquare = { x: -160, y: 22, a: 0, w: 1008*scale, h: 660*scale, c: "#72cdff" };
  bigBlueSquare.finalX = cX - (bigBlueSquare.w / 2);
  bigBlueSquare.update = function(t) {
    this.x = 10*Math.sqrt(t) - 160;
    this.x = Math.min(this.x, this.finalX);
    
    this.a = 0.0007*t;
    this.a = Math.min(this.a, 1.0);
  };
  
  var bottomSquareY = bigBlueSquare.y + bigBlueSquare.h;
  var bottomSquareW = 336*scale;
  var bottomSquareH = 348*scale;
  
  var blueSquare = { x: 500, y: bottomSquareY, a: 0, w: bottomSquareW, h: bottomSquareH, c: "#0082c7" };
  blueSquare.finalX = bigBlueSquare.finalX + bottomSquareW*2;
  blueSquare.update = function(t) {
    this.x = -Math.exp(t*0.0015 + 5) + 650;
    this.x = Math.max(this.x, this.finalX);
    
    this.a = 0.0007*t;
    this.a = Math.min(this.a, 1.0);
  };
  
  var orangeSquare = { x: 367, y: bottomSquareY, a: 0, w: bottomSquareW, h: bottomSquareH, c: "#fe8067" };
  orangeSquare.finalX = bigBlueSquare.finalX + bottomSquareW*0;
  orangeSquare.update = function(t) {
    this.x = -Math.exp(t*0.0018 + 5) + 500;
    this.x = Math.max(this.x, this.finalX);
    
    this.a = 0.0007*t;
    this.x = Math.max(this.x, this.finalX);
  };
  
  var beigeSquare = { x: 440, y: bottomSquareY, a: 0, w: bottomSquareW, h: bottomSquareH, c: "#fff7e4" };
  beigeSquare.finalX = bigBlueSquare.finalX + bottomSquareW*1;
  beigeSquare.update = function(t) {
    this.x = -Math.exp(t*0.0015 + 5) + 565;
    this.x = Math.max(this.x, this.finalX);
    
    this.a = 0.00085*t;
    this.x = Math.max(this.x, this.finalX);
  };
  
  var squares = [bigBlueSquare, blueSquare, orangeSquare, beigeSquare];
  
  function drawSquare(ctx, s) {
    ctx.save();
    ctx.globalAlpha = s.a;
    ctx.fillStyle = s.c;
    ctx.fillRect(s.x, s.y, s.w, s.h);
    ctx.restore();
  }
  
  var plaidP = document.getElementById("plaid-p");
  
  var pI = 0;
  
  function drawP(ctx) {
    ctx.save();
    
    ctx.drawImage(plaidP, 10 + 80*pI, 0, 80, 80, cX - 49, cY - 78, 88, 88);
    
    pI += (t % 1 == 0);
    
    ctx.restore();
  }
  
  function draw() {
    if (pI < 30) {
      requestAnimationFrame(draw);
      var now = new Date().getTime(),
          dt = now - (time || now);
 
      time = now;
      
      t += dt;
      
      ctx.clearRect(0, 0, c.width, c.height);
      
      ctx.fillStyle = "#eee";
      ctx.fillRect(0, 0, c.width, c.height);
      
      for (var i = 0, s = null, len = squares.length; i < len; ++i) {
        s = squares[i];
        s.update(t);
        drawSquare(ctx, s);
      }
      
      if (t > 800) {
        drawP(ctx);
      }
    }
  }
  
  draw();
  
}());
