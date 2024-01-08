const mqtt = require('mqtt');

// Define the MQTT broker URL
const brokerUrl = 'mqtt://mqtt.antares.id:1883';

//Your API Key of your Application in Antares
const access_key = '34299c356a08ad67:7f974df277665f63';

//Application and Device Name in Antares 
const Application = 'Lynx';
const Device = 'Test_Device';

// Define the topic to which you want to publish the message
const topic = `/oneM2M/req/${access_key}/antares-cse/json`;

// Create an MQTT client
const client = mqtt.connect(brokerUrl);

// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Function to publish a message
  const publishMessage = () => {
    
    let temp = Math.floor(Math.random()*100);
    let hum = Math.random()*100;
    
    const data = {
            "m2m:rqp": {
              "fr": `${access_key}`,
              "to": `/antares-cse/antares-id/${Application}/${Device}`,
              "op": 1,
              "rqi": 123456,
              "pc": {
                "m2m:cin": {
                  "cnf": "message",
                  "con": 
                    `{\"temp\":\"${temp}\",\"humidity\":\"${hum}\"}`
                }
              },
              "ty": 4
            }
        }

    // Convert the data to a JSON string
    const jsonData = JSON.stringify(data);

    // Publish the message to the specified topic
    client.publish(topic, jsonData, (err) => {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Message published successfully');
        console.log('message : ' + `{\"temp\":\"${temp}\",\"humidity\":\"${hum}\"}`)
      }
    });
  };

  // Publish a message every 2 seconds
  const intervalId = setInterval(publishMessage, 1000);

  // Optionally, stop the interval after a certain period (e.g., 10 seconds)
  setTimeout(() => {
    clearInterval(intervalId);
    client.end(); // Close the MQTT connection
  }, 100000);
});

// Handle errors
client.on('error', (err) => {
  console.error('MQTT error:', err);
});

// Handle disconnection events
client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});