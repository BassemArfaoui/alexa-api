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
