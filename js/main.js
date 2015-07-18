;(function() {
  
  var logoString = "Lory&Ludlow";
  
  function fadeLetter(className) {
    document.getElementsByClassName(className)[0].classList.add('fade');
  }
  
  setTimeout(function() {
    var len, i;
    
    for (len = logoString.length, i = 2; i <= len; ++i) {
      var delay = 1500*Math.exp(-i/10);
      var letter = 'lnl-letter-' + i;
      setTimeout(fadeLetter.bind(null, letter), delay);
    }
  }, 600);
  
  setTimeout(function() {
    document.querySelector('.logo-square').classList.add('show');
  }, 2000);
  
})();
