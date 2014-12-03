Package.describe({
  summary: "Reactive animations",
  version: "0.6.2",
  name: "percolate:momentum",
  git: "https://github.com/percolatestudio/meteor-momentum.git"
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.2');
  api.use(['templating', 'check', 'jquery', 'underscore', 'percolate:velocityjs@1.0.0'
      ], 'client');
  
  api.add_files([
    'lib/impulse.js',
    'momentum.html', 
    'momentum.js',
    'plugins/none.js',
    'plugins/css.js',
    'plugins/velocity.js',
    'plugins/growl.js',
    'plugins/side-to-side.js',
    'plugins/slide-height.js',
    'plugins/fade.js'
  ], 'client');

  api.export(['Momentum'], 'client');
});
