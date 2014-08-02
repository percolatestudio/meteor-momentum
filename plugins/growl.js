Momentum.registerPlugin('growl', function(options) {
  options = _.extend({}, options, {
    duration: 500,
    easing: [ 250, 15 ], //spring physics
    // easing: [ 0.17, 0.67, 0.83, 0.67 ] //bezier curve
  });
  
  return {
    insertElement: function(node, next) {
      var $node = $(node);
      
      $node
        .insertBefore(next)
        .velocity({
          translateZ: 0,
          scale: [1, 0]
        }, {
          easing: options.easing,
          duration: options.duration,
          queue: false 
        })
        .velocity("fadeIn", {
          duration: options.duration,
          queue: false
        });
      
      $(next).nextAll()
        .velocity({
          translateZ: 0,
          translateY: [-1 * $node.outerHeight()]
        }, {
          duration: 0, 
          queue: false
        })
        .velocity({
          translateY: [0]
        }, {
          duration: options.duration - 100, //speed it up a little
          queue: false
        });
    },
    moveElement: function(node, next) {
      this.removeElement(node);
      this.insertElement(node, next);
    },
    removeElement: function(node) {
      var $node = $(node);

      $node
        .velocity("fadeOut", {
          duration: options.duration,
          complete: function() {
            $node.remove();
          }
        });
    }
  }
});

