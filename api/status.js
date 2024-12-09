import mqtt from 'mqtt';

let latestData = null; // Variable to store the latest data

// MQTT client setup
const MQTT_TOPIC = 'heating-system/status'; // Replace with your topic

const brokerUrl = 'mqtts://db22137176fc49dbb309bff1972cb054.s1.eu.hivemq.cloud';
const mqttClient = mqtt.connect(brokerUrl, {
    port: 8883,
    username: 'bassem', 
    password: 'bassemMQTT123', 
});

// Subscribe to the topic and store the latest message
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(MQTT_TOPIC, (err) => {
        if (err) {
            console.error('Failed to subscribe to topic:', err);
        } else {
            console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
        }
    });
});

client.on('message', (topic, message) => {
    if (topic === MQTT_TOPIC) {
        latestData = message.toString();
        console.log(`Received data from topic "${MQTT_TOPIC}": ${latestData}`);
    }
});

export default function handler(req, res) {
    if (req.method === 'GET') {
        if (latestData) {
            const [temperature, humidity, mode] = latestData.split('-');

            // Respond with the parsed data
            res.status(200).json({
                message: 'Room status retrieved successfully',
                status: {
                    temperature: `${temperature}°C`,
                    humidity: `${humidity}%`,
                    mode: mapMode(mode), // Map mode code to full mode name
                },
            });
        } else {
            res.status(500).json({ message: 'No data received from MQTT broker yet' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

// Function to map mode code to full mode name
function mapMode(mode) {
    const modeMapping = {
        H: 'Heating',
        C: 'Cooling',
        N: 'Normal',
        D: 'Dynamic',
    };
    return modeMapping[mode] || 'Unknown';
}
