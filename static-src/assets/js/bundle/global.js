// -------------------------------------
// GLOBAL SCRIPTS

// nav toggle on mobile
(function() {
  $('.icon-menu-wrap').click(function() {
    var $this = $(this);
    $this.toggleClass('open');
    $('.nav-top--ul').toggleClass('open');
  });
})();


(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
e=o.createElement(i);r=o.getElementsByTagName(i)[0];
e.src='//www.google-analytics.com/analytics.js';
r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
ga('create','UA-44991483-1');ga('send','pageview');