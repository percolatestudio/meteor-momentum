Package.describe({
  summary: "Reactive animations",
  version: "0.0.2",
  name: "percolate:momentum",
  git: "https://github.com/percolatestudio/meteor-momentum.git"
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.0.1');
  api.use(['templating', 'check', 'jquery', 'underscore'], 'client');
  
  api.add_files([
    'lib/velocity/jquery.velocity.js',
    'lib/velocity/velocity.ui.js',
    'momentum.html', 
    'momentum.js',
    'plugins/none.js',
    'plugins/css.js',
    'plugins/velocity.js',
    'plugins/growl.js',
    'plugins/side-to-side.js'
  ], 'client');

  api.export(['Momentum'], 'client');
});
