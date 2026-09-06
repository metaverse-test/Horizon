const socket = new WebSocket(
    "wss://social-websocket-server.onrender.com"
);

socket.onopen = () => {
    console.log("✅ WebSocket connecté");
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("📩 Message reçu :", data);
};

socket.onerror = (error) => {
    console.error("❌ Erreur WebSocket :", error);
};

socket.onclose = () => {
    console.log("🔴 WebSocket déconnecté");
};
