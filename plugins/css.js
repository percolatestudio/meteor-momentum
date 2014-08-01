// defaults, should be overrideable
var OFFSCREEN_CLASS = 'off-screen';
var IN_CLASS = 'in';
var OUT_CLASS = 'out';

var EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd ' 
  + 'msTransitionEnd transitionend';

Momentum.registerPlugin('css', function() {
  return {
    insertElement: function(node, next) {
      console.log('insertElement', node)
      $(node)
        .addClass(OFFSCREEN_CLASS)
        .addClass(IN_CLASS)
        .insertBefore(next);
  
      Deps.afterFlush(function() {
        // call width to force the browser to draw before we do anything
        $(node).width()
        
        // now bring it in
        $(node)
          .removeClass(OFFSCREEN_CLASS)
          .on(EVENTS, function(e) {
            if (e.target === node)
              $(node).removeClass(IN_CLASS);
          });
      });
    },
      // we could do better I guess?
    moveElement: function(node, next) {
      this.removeElement(node);
      this.insertElement(node, next);
    },
    removeElement: function(node) {
      console.log('removeElement', node)
      // add the out class and redraw
      $(node)
        .addClass(OUT_CLASS)
        .width();
      
      // now make it transition off
      $(node)
        .addClass(OFFSCREEN_CLASS)
        .on(EVENTS, function(e) {
          if (e.target === node)
            $(node).remove()
        });
    }
  }
});

