Template.momentum.rendered = function() {
  if (! this.data || ! this.data.plugin)
    return console.error("Missing 'plugin' argument to momentum");

  var plugin = Momentum.plugins[this.data.plugin];

  if (! plugin)
    return console.error("Can't find momentum plugin '" + this.data.plugin + "'");

  var hooks = plugin(_.omit(this.data, 'plugin'));
  
  // default is to remove, *then* add
  if (! hooks.moveElement)
    hooks.moveElement = function(node, next, done) {
      hooks.removeElement(node, function() {
        hooks.insertElement(node, next, done);
      });
    }
  
  check(hooks, Match.Where(function (x) {
    return _.isFunction(x.insertElement) && _.isFunction(x.moveElement) && _.isFunction(x.removeElement);
  }));

  // get either hooks or the 'none' plugin hooks depending if we are disabled
  var getHooks = function() {
    if (Momentum.disabled) {
      return Momentum.plugins.none();
    } else {
      return hooks;
    }
  }
  
  // Pass in the _identity function for the done callback as by default
  // momentum doesn't care about when transitions are done.
  this.lastNode._uihooks = {
    insertElement: function(node, next) {
      getHooks().insertElement(node, next, _.identity);
    },
    moveElement: function(node, next) {
      getHooks().moveElement(node, next, _.identity);
    },
    removeElement: function(node, done) {
      getHooks().removeElement(node, _.identity);
    }
  };
}

Momentum = {
  plugins: {},
  registerPlugin: function(name, plugin) {
    check(name, String);
    check(plugin, Function)
    this.plugins[name] = plugin;
  },
  disabled: false,
  disable: function() {
    this.disabled = true;
  }
}
