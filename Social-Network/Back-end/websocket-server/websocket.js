// ==========================================
// CONFIGURATION WEBSOCKET
// ==========================================

const WEBSOCKET_URL =
    "wss://social-websocket-server.onrender.com";


// ==========================================
// CONNEXION
// ==========================================

let socket = null;


// ==========================================
// CONNECTER LE CLIENT
// ==========================================

function connectWebSocket() {

    // Évite plusieurs connexions simultanées
    if (
        socket &&
        (
            socket.readyState === WebSocket.OPEN ||
            socket.readyState === WebSocket.CONNECTING
        )
    ) {
        return;
    }

    console.log("🔌 Connexion au WebSocket...");

    socket = new WebSocket(WEBSOCKET_URL);


    // ==========================================
    // CONNEXION RÉUSSIE
    // ==========================================

    socket.onopen = function () {

        console.log("🟢 WebSocket connecté");

        sendWebSocket({
            type: "client_connected"
        });
    };


    // ==========================================
    // MESSAGE REÇU
    // ==========================================

    socket.onmessage = function (event) {

        try {

            const data = JSON.parse(event.data);

            console.log("📩 WebSocket :", data);

            handleWebSocketMessage(data);

        } catch (error) {

            console.error(
                "❌ Message WebSocket invalide :",
                error
            );
        }
    };


    // ==========================================
    // ERREUR
    // ==========================================

    socket.onerror = function (error) {

        console.error(
            "❌ Erreur WebSocket :",
            error
        );
    };


    // ==========================================
    // DÉCONNEXION
    // ==========================================

    socket.onclose = function () {

        console.log("🔴 WebSocket déconnecté");

        socket = null;

        // Reconnexion automatique
        setTimeout(function () {

            console.log("🔄 Tentative de reconnexion...");

            connectWebSocket();

        }, 5000);
    };
}


// ==========================================
// ENVOYER UN MESSAGE
// ==========================================

function sendWebSocket(data) {

    if (
        socket &&
        socket.readyState === WebSocket.OPEN
    ) {

        socket.send(
            JSON.stringify(data)
        );

        console.log("📤 WebSocket envoyé :", data);

    } else {

        console.warn(
            "⚠️ WebSocket non connecté"
        );
    }
}


// ==========================================
// TRAITER LES ÉVÉNEMENTS
// ==========================================

function handleWebSocketMessage(data) {

    switch (data.type) {

        // Nouvelle publication
        case "new_publication":

            console.log(
                "🆕 Nouvelle publication",
                data
            );

            break;


        // Publication modifiée
        case "publication_updated":

            console.log(
                "✏️ Publication modifiée",
                data
            );

            break;


        // Publication supprimée
        case "publication_deleted":

            console.log(
                "🗑️ Publication supprimée",
                data
            );

            break;


        // Nouveau like
        case "new_like":

            console.log(
                "❤️ Nouveau like",
                data
            );

            break;


        // Like supprimé
        case "like_removed":

            console.log(
                "💔 Like supprimé",
                data
            );

            break;


        // Nouveau commentaire
        case "new_comment":

            console.log(
                "💬 Nouveau commentaire",
                data
            );

            break;


        // Commentaire supprimé
        case "comment_deleted":

            console.log(
                "🗑️ Commentaire supprimé",
                data
            );

            break;


        // Nouvelle sauvegarde
        case "new_save":

            console.log(
                "🔖 Nouvelle sauvegarde",
                data
            );

            break;


        // Nouveau partage
        case "new_share":

            console.log(
                "🔗 Nouveau partage",
                data
            );

            break;


        // Notification
        case "new_notification":

            console.log(
                "🔔 Nouvelle notification",
                data
            );

            break;


        // Nouveau message
        case "new_message":

            console.log(
                "💬 Nouveau message",
                data
            );

            break;


        // Connexion confirmée par le serveur
        case "connected":

            console.log(
                "✅ Serveur WebSocket connecté :",
                data.message
            );

            break;


        default:

            console.log(
                "ℹ️ Événement inconnu :",
                data
            );
    }
}


// ==========================================
// LANCER LA CONNEXION
// ==========================================

connectWebSCONNEXION
