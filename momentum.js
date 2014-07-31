Template.momentum.rendered = function() {
  if (! this.data || ! this.data.with)
    return console.error("Missing 'with' argument to momentum");

  var plugin = Momentum.plugins[this.data.with];

  if (! plugin)
    return console.error("Can't find momentum plugin '" + this.data.with + "'");

  this.firstNode.parentNode._uihooks = plugin;
}

Momentum = {
  plugins: {},
  registerPlugin: function(name, hooks) {
    check(name, String);
    check(hooks, {
      insertElement: Function,
      moveElement: Function,
      removeElement: Function
    });

    this.plugins[name] = hooks;
  }
}