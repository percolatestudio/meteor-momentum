var OFFSCREEN_CLASS = 'off-screen';
var EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd ' 
  + 'msTransitionEnd transitionend';

Momentum.registerPlugin('css', {
  insertElement: function(node, next) {
    $(node)
      .addClass(OFFSCREEN_CLASS)
      .insertBefore(next);
  
    Deps.afterFlush(function() {
      // call width to force the browser to draw it
      $(node).width();
      $(node).removeClass(OFFSCREEN_CLASS);
    });
  },
    // we could do better I guess?
  moveElement: function(node, next) {
    hooks.removeElement(node);
    hooks.insertElement(node, next);
  },
  removeElement: function(node) {
    $(node).addClass(OFFSCREEN_CLASS)
      .on(EVENTS, function() {
        $(node).remove()
      });
  }
});

