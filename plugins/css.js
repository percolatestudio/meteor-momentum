// defaults, should be overrideable
var OFFSCREEN_CLASS = 'off-screen';
var IN_CLASS = 'in';
var OUT_CLASS = 'out';

var EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd ' 
  + 'msTransitionEnd transitionend';

Momentum.registerPlugin('css', function(options) {
  options = _.extend({
    // extra: a function that returns an extra class to be added
    // timeout: a "maximum" time that the transition can take
    // onComplete: callback when transition is finished
  }, options);
  
  check(options.extra, Match.Optional(Function));
  
  return {
    insertElement: function(node, next) {
      var klass = IN_CLASS;
      if (options.extra)
        klass += ' ' + options.extra();
      
      $(node)
        .addClass(OFFSCREEN_CLASS)
        .addClass(klass)
        .insertBefore(next);
  
      Deps.afterFlush(function() {
        // call width to force the browser to draw before we do anything
        $(node).width()
        
        var done = _.once(function() {
          $(node).removeClass(klass);
          options.onComplete && options.onComplete(node);
        });
        
        $(node).removeClass(OFFSCREEN_CLASS);
        
        // XXX: We have to bind the event listener to the PARENT of the node,
        //  because Blaze runs jQ.cleanNode before "removing" the node.
        //
        // What this means is, that if we are mid-way through our "add"
        // transition, and then the node is "removed", then even though
        // we may not actually remove the node from the DOM, this 
        // event will never fire, meaning classes and junk will be left on
        // the node. This seems a pretty reasonable workaround.
        //
        // If the parent itself is "removed".. well then we'll have a problem.
        $(node).parent()
          .on(EVENTS, function(e) {
            if (e.target === node) {
              $(this).off(e);
              done()
            }
          });
        
        if (options.timeout)
          Meteor.setTimeout(done, options.timeout);
      });
    },
      // we could do better I guess?
    moveElement: function(node, next) {
      this.removeElement(node);
      this.insertElement(node, next);
    },
    removeElement: function(node) {
      var klass = OUT_CLASS;
      if (options.extra)
        klass += ' ' + options.extra();
      
      // add the out class and redraw
      $(node)
        .addClass(klass)
        .width();
      
      var done = _.once(function() {
        $(node).remove();
        options.onComplete && options.onComplete(node);
      });
      
      // now make it transition off
      $(node)
        .addClass(OFFSCREEN_CLASS)
        .on(EVENTS, function(e) {
          if (e.target === node) {
            $(this).off(e);
            done();
          }
        });
      
      if (options.timeout)
        Meteor.setTimeout(done, options.timeout);
    }
  }
});

