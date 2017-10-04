require('dotenv').config()

var gpsd = require('node-gpsd');
var io = require('socket.io-client');

var daemon = new gpsd.Daemon({
  program: '/usr/sbin/gpsd',
  device: process.env.DEVICE
});

var socket = io.connect(process.env.SOCKET_IO_HOST);
socket.on('connect', () => {
  console.log('socketio connect');
  daemon.start(() => {
    console.log('gpsd started');
    var listener = new gpsd.Listener();

    listener.on('TPV', (tpv) => {
      socket.emit(tpv);
    });

    listener.connect(() => {
      listener.watch();
    });
  });

})

socket.on('event', (data) => {
  console.log('socket event' + data);
});

socket.on('disconnect', () => {
  console.log('disconnect');
});
