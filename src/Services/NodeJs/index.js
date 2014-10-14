var Hapi = require('hapi');
var Good = require('good');

// Create a server with a host and port
var server = new Hapi.Server('localhost', 8000);

// Add the route
server.route({
  method: 'GET',
  path: '/api',
  handler: function (request, reply) {

    reply('hello world');
  }
});

server.pack.register(Good, function (err) {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});