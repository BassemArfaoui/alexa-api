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

module.exports = (req, res) => {
    const { temp } = req.query;

    if (!temp) {
        return res.status(400).json({ error: 'temp parameter is required' });
    }


    if (temp < 16 || temp >30 ) {
        return res.status(400).json({ error: `temperature must be between 16 and 30` });
    }

    const topic = 'heating-system/ac';

    mqttClient.publish(topic, temp, (err) => {
        if (err) {
            console.error('Publish error:', err);
            return res.status(500).json({ error: 'Failed to publish temp' });
        }

        console.log(`Temp ${temp} published to topic ${topic}`);
        return res.status(200).json({ success: true, temp });
    });
};
