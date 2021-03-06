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
  console.log('mqtt connected');
  daemon.start(() => {
    console.log('gpsd started');
    var listener = new gpsd.Listener();
    
    listener.on('TPV', (tpv) => {
      let data = {
        service: 'gps',
	data: tpv
      }
      mqttClient.publish('event', JSON.stringify(data))
    });

    listener.connect(() => {
      listener.watch();
    });
  });
})
