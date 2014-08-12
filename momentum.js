Template.momentum.rendered = function() {
  if (! this.data || ! this.data.with)
    return console.error("Missing 'with' argument to momentum");

  var plugin;
  if (_.isFunction(this.data.with)) {
    plugin = Momentum.plugins.dynamic;
    this.data.options = this.data.with;
  } else {
    plugin = Momentum.plugins[this.data.with];
  }

  if (! plugin)
    return console.error("Can't find momentum plugin '" + this.data.with + "'");

  var hooks = plugin(_.omit(this.data, 'with'));
  
  check(hooks, {
    insertElement: Function,
    moveElement: Function,
    removeElement: Function
  });
  
  this.lastNode._uihooks = hooks;
}

Momentum = {
  plugins: {},
  registerPlugin: function(name, plugin) {
    check(name, String);
    check(plugin, Function)
    this.plugins[name] = plugin;
  }
}