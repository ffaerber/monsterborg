require('dotenv').config()

var gpsd = require('node-gpsd');
var mqtt = require('mqtt')

var daemon = new gpsd.Daemon({
	program: '/usr/sbin/gpsd',
	device: process.env.DEVICE,
	logger: {
		info: console.log,
		warn: console.warn,
	        error: console.error
	}
});

console.log('connect to ' + process.env.MESSAGE_BUS_HOST)
var mqttClient = mqtt.connect(process.env.MESSAGE_BUS_HOST)

mqttClient.on('connect', () => {
  console.log('socketio connected');
  daemon.start(() => {
    console.log('gpsd started');
    var listener = new gpsd.Listener();
    
    listener.on('TPV', (tpv) => {
	mqttClient.publish('gps', JSON.stringify(tpv))
    });

    listener.connect(() => {
      listener.watch();
    });
  });
})


