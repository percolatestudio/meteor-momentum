Momentum.registerPlugin('dynamic', function(options) {
  check(options, {
    options: Match.Optional(Function)
  });
  
  var getPlugin = function(node) {
    var pluginOptions = options.options(node);
    
    if (_.isString(pluginOptions))
      pluginOptions = {with: pluginOptions};
    
    var plugin = Momentum.plugins[pluginOptions.with];
    if (! plugin)
      return console.error("Can't find momentum plugin '" + pluginOptions.with + "'");
    
    return plugin(_.omit(pluginOptions, 'with'));
  }
  
  return {
    insertElement: function(node, next) {
      getPlugin(node).insertElement(node, next);
    },
    moveElement: function(node, next) {
      getPlugin(node).moveElement(node, next);
    },
    removeElement: function(node) {
      getPlugin(node).removeElement(node);
    }
  }
});