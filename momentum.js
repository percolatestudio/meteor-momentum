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
  
  this.lastNode._uihooks = hooks;
}

UI.registerHelper('_momentumTrigger', Template.__create__('_momentumTrigger', function() {
  var momentumView = Blaze.getParentView(this, 'Template.momentum');
  
  console.log(momentumView.parentView, momentumView.parentView.___isTemplateWith, momentumView.parentView.dataVar.get()['force'])
  
  // XXX: there should be an easier way of doing this.
  //   we could also use DynamicTemplate.getInclusionArguments(momentumView)
  if (momentumView.parentView && momentumView.parentView.___isTemplateWith)
    // setup a reactive depedency on the "force" option
    momentumView.parentView.dataVar.get()['force'];
  
  return this.templateContentBlock;
}));


Momentum = {
  plugins: {},
  registerPlugin: function(name, plugin) {
    check(name, String);
    check(plugin, Function)
    this.plugins[name] = plugin;
  }
}