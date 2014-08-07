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
        });
        
        // now bring it in
        $(node)
          .removeClass(OFFSCREEN_CLASS)
          .on(EVENTS, function(e) {
            (e.target === node) && done()
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
        $(node).remove()
      });
      
      // now make it transition off
      $(node)
        .addClass(OFFSCREEN_CLASS)
        .on(EVENTS, function(e) {
          (e.target === node) && done();
        });
      
      if (options.timeout)
        Meteor.setTimeout(done, options.timeout);
    }
  }
});

