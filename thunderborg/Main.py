#!/usr/bin/env python
# coding: Latin-1

# Import library functions we need
import os
import paho.mqtt.client as mqtt
import json
import ThunderBorg
import time
import sys

# Setup the ThunderBorg
TB = ThunderBorg.ThunderBorg()     # Create a new ThunderBorg object
#TB.i2cAddress = 0x15              # Uncomment and change the value if you have changed the board address
TB.Init()                          # Set the board up (checks the board is connected)
if not TB.foundChip:
    boards = ThunderBorg.ScanForThunderBorg()
    if len(boards) == 0:
        print 'No ThunderBorg found, check you are attached :)'
    else:
        print 'No ThunderBorg at address %02X, but we did find boards:' % (TB.i2cAddress)
        for board in boards:
            print '    %02X (%d)' % (board, board)
        print 'If you need to change the I�C address change the setup line so it is correct, e.g.'
        print 'TB.i2cAddress = 0x%02X' % (boards[0])
    sys.exit()

# Disable the colour by battery level
TB.SetLedShowBattery(False)

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
