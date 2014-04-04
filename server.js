var Hapi = require('hapi');

// create server with host and port
var server = module.exports = Hapi.createServer('localhost', process.env.PORT || 7000);


// home
server.pack.register(require('./plugin/homepage/index').register, function(err){
  if(err){
    console.log('Failed loading plugin: Homepage');
  }
});


server.pack.require('./plugin/coffee', function(err){
  if(err){
    console.log('Failed loading plugin: Coffee');
  }
});

server.pack.require('./plugin/coffeemaker', function(err){
  if(err){
    console.log('Failed loading plugin: Coffeemaker');
  }
});


// start the server
server.start(function(){
  console.log('Server started at port ' + server.info.port);
});
