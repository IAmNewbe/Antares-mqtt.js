const mqtt = require('mqtt');
require('dotenv').config();

// Replace these with your MQTT broker details
// const brokerUrl = 'mqtt://mqtt.antares.id:1883';
const brokerUrl = "mqtt://mqtt-cleen.plnnusantarapower.co.id";
// const access_key = '34299c356a08ad67:7f974df277665f63';

// Create an MQTT client instance
const client = mqtt.connect(brokerUrl);
// const topic = `/oneM2M/resp/antares-cse/${access_key}/json`;
const topic = "UPMKR/testnodemcu";

// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to a topic
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to ${topic}`);
    } else {
      console.error(`Error subscribing to ${topic}: ${err}`);
    }
  });

});

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  // Disconnect after receiving a message
  // client.end();
});

// Handle disconnection events
client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});

// Handle errors
client.on('error', (err) => {
  console.error(`MQTT error: ${err}`);
});
