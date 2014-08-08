Momentum.registerPlugin('none', function(options) {
  options = _.extend({
    // onComplete: callback when transition is finished
  }, options);
  
  return {
    insertElement: function(node, next) {
      next.parentNode.insertBefore(node, next);
      options.onComplete && options.onComplete(node);
    },
    moveElement: function(node, next) {
      next.parentNode.insertBefore(node, next);
      options.onComplete && options.onComplete(node);
    },
    removeElement: function(node) {
      node.parentNode.removeChild(node);
      options.onComplete && options.onComplete(node);
    }
  }
});