require('dotenv').config()
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const mqtt = require('mqtt')
const messageBus = mqtt.connect(process.env.MESSAGE_BUS_HOST)
const groundStation = require('socket.io-client')(process.env.GROUND_STATION_HOST);

messageBus.on('connect', () => {
  console.log('subscripe to gps messageBus channel')
  messageBus.subscribe('event')
})

messageBus.on('message', (topic, message) => {
  //console.log(decoder.write(message))
  groundStation.emit('event', JSON.parse(decoder.write(message)))
})


console.log('connecting to groundStaion ' + process.env.GROUND_STATION_HOST)
groundStation.on('connect', () => {
  console.log('groundStation connected')
});

groundStation.on('event', (data) => {
  messageBus.publish(data['service'], JSON.stringify(data))
});

groundStation.on('disconnect', () => {
  console.log('groundStation disconnected')
});
