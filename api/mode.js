const mqtt = require('mqtt');

// MQTT client configuration
const brokerUrl = 'mqtts://db22137176fc49dbb309bff1972cb054.s1.eu.hivemq.cloud';
const mqttClient = mqtt.connect(brokerUrl, {
    port: 8883,
    username: 'bassem', 
    password: 'bassemMQTT123', 
});

// MQTT connection handlers
mqttClient.on('connect', () => {
    console.log('Connected to HiveMQ Cloud MQTT broker');
});

mqttClient.on('error', (err) => {
    console.error('MQTT connection error:', err);
});

// Vercel API handler
module.exports = (req, res) => {
    const { mode } = req.query;

    if (!mode) {
        return res.status(400).json({ error: 'Mode parameter is required' });
    }

    const validModes = ['C', 'H', 'N', 'D'];
    if (!validModes.includes(mode.toUpperCase())) {
        return res.status(400).json({ error: `Invalid mode. Choose one of ${validModes.join(', ')}` });
    }

    const topic = 'heating-system/mode';

    mqttClient.publish(topic, mode.toUpperCase(), (err) => {
        if (err) {
            console.error('Publish error:', err);
            return res.status(500).json({ error: 'Failed to publish mode' });
        }

        console.log(`Mode ${mode} published to topic ${topic}`);
        return res.status(200).json({ success: true, mode });
    });
};
