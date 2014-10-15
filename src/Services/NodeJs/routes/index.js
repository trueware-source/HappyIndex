exports.init = function(server) {
  console.log('Loading routes');

  require('./pollingstations')(server);
};