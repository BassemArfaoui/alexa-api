const express = require('express');
const mqtt = require('mqtt');
const fs = require('fs'); 

const app = express();


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

app.get('/:mode', (req, res) => {
    const mode = req.params.mode.toUpperCase();

    const validModes = ['C', 'H', 'N', 'D'];
    if (!validModes.includes(mode)) {
        return res.status(400).send({ error: `Invalid mode. Choose one of ${validModes.join(', ')}` });
    }

    const topic = 'heating-system/mode'; 
    mqttClient.publish(topic, mode, (err) => {
        if (err) {
            console.error('Publish error:', err);
            return res.status(500).send({ error: 'Failed to publish mode' });
        }

        console.log(`Mode ${mode} published to topic ${topic}`);
        res.send({ success: true, mode });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
