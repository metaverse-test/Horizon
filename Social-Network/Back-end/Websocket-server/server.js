const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({
    port: PORT
});

console.log(`WebSocket server running on port ${PORT}`);

wss.on("connection", (socket) => {

    console.log("Client connected");

    socket.send(JSON.stringify({
        type: "connected",
        message: "Connexion WebSocket réussie"
    }));

    socket.on("message", (message) => {

        try {

            const data = JSON.parse(message);

            console.log("Message reçu :", data);

        } catch (error) {

            console.error("Message invalide");

        }

    });

    socket.on("close", () => {

        console.log("Client disconnected");

    });

    socket.on("error", (error) => {

        console.error("WebSocket error :", error);

    });

});
