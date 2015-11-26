;(function(){
  var config = {
    id: 'app',
    particleLife: 300,
    particleRenderProbability: 0.95,
    amount: 50,
    resizePoll: 250,
    star: {
      size: {
        upper: 50,
        lower: 25
      },
      rotateLimit: 90,
      points: 5,
      innerRadius: 0.5,
      borderColor: '#111',
      fillColor: '#2ecc71'
    }
  };

  if (window.navigator.platform.toUpperCase().indexOf('WIN') !== -1) {
    document.body.className += ' windows';
  }

  myCanvas = new ShootingStars(config);
  myCanvas.flushPool();
  myCanvas.render();

  if (window.navigator.userAgent.indexOf('Trident') !== -1 ||
      window.navigator.userAgent.indexOf('MSIE') !== -1 ||
      window.navigator.userAgent.indexOf('Edge') !== -1) {
    document.body.className += ' ie';
  } else {
    $('header').height(window.innerHeight);
  }
  $(window).on('resize', function() {
    $('header').height(window.innerHeight);
  });


  var fadeStart = 100,
    fadeUntil = 300,
    fading = $('header h1');

  $('[octo-nav-page-content] > [octo-nav-scrollable]').on('scroll', function(){
    var offset = $('[octo-nav-page-content] > [octo-nav-scrollable]').scrollTop(),
      opacity = 0;
    if (offset <= fadeStart) {
        opacity = 1;
        uTop = 100;
    } else if (offset <= fadeUntil) {
        opacity = 1 - offset / fadeUntil;
    }
    if (offset > 0) {
      uTop = 100 - (offset / 2);
    }
    fading.css({
      'opacity': opacity,
      'top': uTop
    });
  });
}());
