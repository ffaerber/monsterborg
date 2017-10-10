import os
import paho.mqtt.client as mqtt
import json

print('connecting to ' + os.environ['MESSAGE_BUS_HOST'])

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("thunderborg/#")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    message = eval(msg.payload)
    method_to_call = globals()[message['method']](message['attributes'])

def getBatteryLevel(attr):
    print(attr)

client = mqtt.Client('thunderborg')
client.on_connect = on_connect
client.on_message = on_message

client.connect(os.environ['MESSAGE_BUS_HOST'], 1883, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
