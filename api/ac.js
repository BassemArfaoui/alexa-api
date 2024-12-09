const mqtt = require('mqtt');

const brokerUrl = 'mqtts://db22137176fc49dbb309bff1972cb054.s1.eu.hivemq.cloud';
const mqttClient = mqtt.connect(brokerUrl, {
    port: 8883,
    username: 'bassem',
    password: 'bassemMQTT123',
});

const mqttTopic = 'heating/test';

// Connect to the MQTT broker and subscribe to the topic
mqttClient.on('connect', () => {
    console.log('Connected to HiveMQ Cloud MQTT broker');
    mqttClient.subscribe(mqttTopic, (err) => {
        if (err) {
            console.error('Failed to subscribe to topic:', err);
        } else {
            console.log(`Subscribed to topic: ${mqttTopic}`);
        }
    });
});


// Handle MQTT errors
mqttClient.on('error', (err) => {
    console.error('MQTT connection error:', err);
});

// API handler function
export default function handler(req, res) {
    if (req.method === 'GET') {
        // Return the latest message as-is
       res.status(200).json({
            message: 'test',
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
