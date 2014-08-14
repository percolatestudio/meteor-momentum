Momentum.registerPlugin('none', function(options) {
  return {
    insertElement: function(node, next, done) {
      next.parentNode.insertBefore(node, next);
      done();
    },
    moveElement: function(node, next, done) {
      next.parentNode.insertBefore(node, next);
      done();
    },
    removeElement: function(node, done) {
      node.parentNode.removeChild(node);
      done();
    }
  }
});