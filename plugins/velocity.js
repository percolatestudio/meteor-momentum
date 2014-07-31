Momentum.registerPlugin('velocity', function(options) {
  return {
    insertElement: function(node, next) {
      $(node)
        .insertBefore(next)
        // .velocity("fadeIn", { duration: 500 });
        .velocity("slideDown", { duration: 500 });
    },
    moveElement: function(node, next) {
      this.removeElement(node);
      this.insertElement(node, next);
    },
    removeElement: function(node) {
      $(node)
        .velocity("slideUp", { 
        // .velocity("fadeOut", { 
          duration: 500,
          complete: function() {
            $(node).remove()
          }
        });
    }
  }
});

