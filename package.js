Package.describe({
  summary: "Reactive animations"
});

Package.on_use(function (api) {
  api.use(['templating', 'check'], 'client');
  
  api.add_files([
    'momentum.html', 
    'momentum.js',
    'plugins/css.js'
  ], 'client');

  api.export(['Momentum'], 'client');
});
