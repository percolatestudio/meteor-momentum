// XXX: make this a plugin itself?
var sideToSide = function(fromX, toX) {
  return function(options) {
    options = _.extend({
      duration: 500,
      easing: 'ease-in-out'
    }, options);
  
    return {
      insertElement: function(node, next) {
        var $node = $(node);
      
        $node
          .insertBefore(next)
          .velocity({
            translateZ: 0,
            translateX: [fromX]
          }, {
            duration: 0,
            queue: false
          })
          .velocity({
            translateX: [0]
          }, {
            easing: options.easing,
            duration: options.duration,
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
          .velocity({
            translateX: [toX]
          }, {
            duration: options.duration,
            easing: options.easing,
            complete: function() {
              $node.remove();
            }
          });
      }
    }
  }
}

Momentum.registerPlugin('right-to-left', sideToSide('100%', '-100%'));
Momentum.registerPlugin('left-to-right', sideToSide('-100%', '100%'));

