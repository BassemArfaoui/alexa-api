const mqtt = require('mqtt');

const brokerUrl = 'mqtts://db22137176fc49dbb309bff1972cb054.s1.eu.hivemq.cloud';
const mqttClient = mqtt.connect(brokerUrl, {
    port: 8883,
    username: 'bassem',
    password: 'bassemMQTT123',
});

const mqttTopic = 'heating-system/status';
let latestMessage = 'No data received'; // Store the latest message

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

// Handle incoming messages
mqttClient.on('message', (topic, message) => {
    if (topic === mqttTopic) {
        latestMessage = message.toString(); // Update the latest message
        console.log(`Received message on topic ${topic}: ${latestMessage}`);
    }
});

// Handle MQTT errors
mqttClient.on('error', (err) => {
    console.error('MQTT connection error:', err);
});

// API handler function
export default function handler(req, res) {
    if (req.method === 'GET') {
        // Decode the latest message
        const [temperature, humidity, mode] = latestMessage.split('-');

        // Format the response
        const status = {
            temperature: `${temperature}°C`,
            humidity: `${humidity}%`,
            mode: decodeMode(mode),
        };

        res.status(200).json({
            message: 'Room status retrieved successfully',
            status,
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

// Helper function to decode the mode
function decodeMode(mode) {
    const modeMapping = {
        H: 'Heating',
        C: 'Cooling',
        N: 'Normal',
        D: 'Dynamic',
    };
    return modeMapping[mode] || 'Unknown';
}
