Package.describe({
  summary: "Reactive animations"
});

Package.on_use(function (api) {
  api.use(['templating', 'check', 'jquery'], 'client');
  
  api.add_files([
    'lib/velocity/jquery.velocity.js',
    'momentum.html', 
    'momentum.js',
    'plugins/css.js'
  ], 'client');

  api.export(['Momentum'], 'client');
});
