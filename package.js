Package.describe({
  summary: "Reactive animations",
  version: "0.5.0",
  name: "percolate:momentum",
  git: "https://github.com/percolatestudio/meteor-momentum.git"
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.2');
  api.use(['templating', 'check', 'jquery', 'underscore', 'percolate:velocityjs'
      ], 'client');
  
  api.add_files([
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
