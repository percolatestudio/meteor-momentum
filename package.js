Package.describe({
  summary: "Reactive animations",
  version: "0.0.0"
});

Package.on_use(function (api) {
  api.use(['templating', 'check', 'jquery', 'underscore'], 'client');
  
  api.add_files([
    'lib/velocity/jquery.velocity.js',
    'lib/velocity/velocity.ui.js',
    'momentum.html', 
    'momentum.js',
    'momentum.css',
    'plugins/none.js',
    'plugins/dynamic.js',
    'plugins/css.js',
    'plugins/velocity.js',
    'plugins/growl.js',
    'plugins/side-to-side.js'
  ], 'client');

  api.export(['Momentum'], 'client');
});
