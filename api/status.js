const mqtt = require('mqtt');

const brokerUrl = 'mqtts://db22137176fc49dbb309bff1972cb054.s1.eu.hivemq.cloud';
const mqttClient = mqtt.connect(brokerUrl, {
    port: 8883,
    username: 'bassem', 
    password: 'bassemMQTT123', 
});

mqttClient.on('connect', () => {
    console.log('Connected to HiveMQ Cloud MQTT broker');
});

mqttClient.on('error', (err) => {
    console.error('MQTT connection error:', err);
});



export default function handler(req, res) {
    if (req.method === 'GET') {
        // Example: Replace this with your logic to retrieve status information
        const status = {
            temperature: "22°C",
            humidity: "45%",
            mode: "Cooling",
        };

        res.status(200).json({
            message: "Room status retrieved successfully",
            status,
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
