var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');

    socket.on('new message', function(msg){
      console.log('new message: ' + msg);
      socket.broadcast.emit('chat message', msg);
      socket.emit('chat message', msg);
    });
});


socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;
