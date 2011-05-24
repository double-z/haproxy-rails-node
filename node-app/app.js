var express = require('express');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}

var io = require('socket.io');
var socket = io.listen(app, {});
socket.on('connection', function(client){
    console.log('connection made');
    socket.broadcast('hiya!');
});
