;(function() {
  
  var logoString = "Lory&Ludlow",
      len = logoString.length;
  
  function fadeLetter(letter) {
    letter.classList.remove('show');
    letter.classList.add('fade');
  }
  
  function forEachLetter(visit) {
    var i;
    
    for (i = 2; i <= len; ++i) {
      var className = 'lnl-letter-' + i;
      var letter = document.getElementsByClassName(className)[0];
      visit(letter, i, len);
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
  
    setTimeout(function() {
      var delay = 0;
    
      forEachLetter(function(letter, i, total) {
        delay = 0.88*Math.exp(i/2) + 200;
        console.log(delay);
        setTimeout(function() {
          letter.classList.add('show');
        }, delay);
      });
    
      delay += 800;
    
      setTimeout(function() {
        forEachLetter(fadeLetter);
        console.log('hi');
      }, delay);
    
      delay += 100;
    
      console.log(delay);
    
      setTimeout(function() {
        document.querySelector('.logo-square').classList.add('show');
      }, delay);
    }, 600);
  });
  
  // setTimeout(function() {
  //   forEachLetter(function(letter, i, total) {
  //     var delay = 1500*Math.exp(-i/10);
  //     setTimeout(fadeLetter.bind(null, letter), delay);
  //   });
  // }, 600);
  
})();
