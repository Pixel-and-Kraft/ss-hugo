
(function() {

  /*jshint -W098 */

  var frameOne = $('iframe#amazon'),
  contentsOne = frameOne.contents(),
  bodyOne = contentsOne.find('body');

  $('textarea').focus(function() {
    var $thisOne = $(this);

  // To live update the preview box
    $thisOne.keyup(function() { 
      bodyOne.text( $thisOne.val() );
      bodyOne.text( $thisOne.val().replace(/[>]/g, '&gt;').replace(/[<]/g, '&lt;') );
    });
  });
})();

(function() {
  var frame = $('iframe#preview'),
  contents = frame.contents(),
  body = contents.find('body'),
  styleTag = contents.find('head')
            .append('<style>*{font-family:verdana,arial,helvetica,sans-serif;font-size:13}h1{font-weight:bold;font-size:26;margin-before:0.67em;margin-after:0.67em}h2{color:#CC6600;font-size:16;margin-before:0.83em;margin-after:0.83em}li{margin:0.5em 0em;}</style>')
            .children('style');

  $('textarea').focus(function() {
    var $this = $(this);

    $this.keyup(function() {
      body.html( $this.val() );
    });
  });
})();