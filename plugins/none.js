Momentum.registerPlugin('none', function(options) {
  return {
    insertElement: function(node, next) {
      next.parentNode.insertBefore(node, next);
    },
    moveElement: function(node, next) {
      next.parentNode.insertBefore(node, next);
    },
    removeElement: function(node) {
      node.parentNode.removeChild(node);
    }
  }
});