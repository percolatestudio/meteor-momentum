Momentum.registerPlugin('fade', function(options) {
  return {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .velocity('fadeIn');
    },
    removeElement: function(node) {
      $(node).velocity('fadeOut', function() {
        $(this).remove();
      });
    }
  }
});