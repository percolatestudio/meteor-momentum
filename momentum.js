Template.momentum.rendered = function() {
  if (! this.data || ! this.data.with)
    return console.error("Missing 'with' argument to momentum");

  var plugin = Momentum.plugins[this.data.with];

  if (! plugin)
    return console.error("Can't find momentum plugin '" + this.data.with + "'");

  var hooks = plugin(_.omit(this.data, 'with'));
  
  check(hooks, {
    insertElement: Function,
    moveElement: Function,
    removeElement: Function
  });
  
  // Pass in the _identity function for the done callback as by default
  // momentum doesn't care about when transitions are done.
  this.lastNode._uihooks = {
    insertElement: function(node, next) {
      hooks.insertElement(node, next, _.identity);
    },
    moveElement: function(node, next) {
      hooks.moveElement(node, next, _.identity);
    },
    removeElement: function(node, done) {
      hooks.removeElement(node, _.identity);
    }
  };
}

Momentum = {
  plugins: {},
  registerPlugin: function(name, plugin) {
    check(name, String);
    check(plugin, Function)
    this.plugins[name] = plugin;
  }
}