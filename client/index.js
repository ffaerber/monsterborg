require('dotenv').config()
const mqtt = require('mqtt')
const messageBus = mqtt.connect(process.env.MESSAGE_BUS_HOST)
const groundStation = require('socket.io-client')(process.env.GROUND_STATION_HOST);

messageBus.on('connect', () => {
  console.log('subscripe to gps messageBus channel')
  messageBus.subscribe('gps')
})

messageBus.on('message', (topic, message) => {
  //console.log('new messageBus message in channel ' + topic + ' with message ' + message)
  groundStation.emit(message)
})

console.log('connecting to groundStaion ' + process.env.GROUND_STATION_HOST)
groundStation.on('connect', () => {
  console.log('groundStation connected')
});

groundStation.on('event', (data) => {
  groundStation.emit(data)
  console.log('groundStation event' + data)
});

groundStation.on('disconnect', () => {
  console.log('groundStation disconnected')
});

