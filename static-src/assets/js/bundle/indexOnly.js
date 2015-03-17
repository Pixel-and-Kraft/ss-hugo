// -------------------------------------
// INDEX ONLY SCRIPTS

(function() {
  var slider = new MasterSlider();
  slider.setup('masterslider', {
    loop: true,
    width: 200,
    height: 300,
    speed: 20,
    view: 'focus',
    preload: 'all',
    space: 75,
    wheel: true
  });
  slider.control('arrows');
  slider.control('slideinfo', {insertTo:'#book-info'});
})();