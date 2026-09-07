// ==========================================
// CONFIGURATION XANO
// ==========================================

const API_PUBLICATIONS =
    "https://x8ki-letl-twmt.n7.xano.io/api:LiDt6uB0/publications";


// ==========================================
// CONTENEUR PRINCIPAL
// ==========================================

const mainContent =
    document.getElementById("mainContent");


// ==========================================
// CHARGER LES PUBLICATIONS
// ==========================================

async function loadPublications() {

    if (!mainContent) {
        console.error(
            "❌ #mainContent introuvable."
        );
        return;
    }

    try {

        mainContent.innerHTML =
            "<p>Chargement des publications...</p>";


        const response =
            await fetch(API_PUBLICATIONS);


        if (!response.ok) {

            throw new Error(
                `Erreur HTTP ${response.status}`
            );

        }


        const publications =
            await response.json();


        console.log(
            "📚 Publications reçues depuis Xano :",
            publications
        );


        // Vider le contenu actuel

        mainContent.innerHTML = "";


        // ======================================
        // AUCUNE PUBLICATION
        // ======================================

        if (
            !publications ||
            publications.length === 0
        ) {

            mainContent.innerHTML =
                "<p>Aucune publication pour le moment.</p>";

            return;
        }


        // ======================================
        // AFFICHER LES PUBLICATIONS
        // ======================================

        publications.forEach(
            function (publication) {

                const card =
                    createPublicationCard(
                        publication
                    );

                mainContent.appendChild(card);

            }
        );


    } catch (error) {

        console.error(
            "❌ Erreur Xano :",
            error
        );


        mainContent.innerHTML =
            "<p>❌ Impossible de charger les publications.</p>";
    }
}


// ==========================================
// CRÉER UNE CARTE
// ==========================================

function createPublicationCard(
    publication
) {

    const article =
        document.createElement("article");


    article.className =
        "publication-card";


    article.dataset.id =
        publication.id;


    // ======================================
    // UTILISATEUR
    // ======================================

    const username =
        publication.username ||
        publication.user?.username ||
        "Utilisateur";


    // ======================================
    // CONTENU
    // ======================================

    const content =
        publication.content || "";


    // ======================================
    // DATE
    // ======================================

    const date =
        publication.created_at || "";


    article.innerHTML = `

        <div class="publication-header">

            <strong>
                ${escapeHTML(username)}
            </strong>

        </div>


        <div class="publication-content">

            ${escapeHTML(content)}

        </div>


        <div class="publication-date">

            ${escapeHTML(date)}

        </div>

    `;


    return article;
}


// ==========================================
// PROTECTION HTML
// ==========================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==========================================
// AJOUTER UNE PUBLICATION
// Utilisé par WebSocket
// ==========================================

function addPublication(
    publication
) {

    if (!mainContent) {
        return;
    }


    const card =
        createPublicationCard(
            publication
        );


    mainContent.prepend(card);
}


// ==========================================
// MODIFIER UNE PUBLICATION
// Utilisé par WebSocket
// ==========================================

function updatePublication(
    publication
) {

    if (!mainContent) {
        return;
    }


    const oldCard =
        mainContent.querySelector(
            `[data-id="${publication.id}"]`
        );


    if (!oldCard) {

        addPublication(
            publication
        );

        return;
    }


    const newCard =
        createPublicationCard(
            publication
        );


    oldCard.replaceWith(
        newCard
    );
}


// ==========================================
// SUPPRIMER UNE PUBLICATION
// Utilisé par WebSocket
// ==========================================

function removePublication(
    publicationId
) {

    if (!mainContent) {
        return;
    }


    const card =
        mainContent.querySelector(
            `[data-id="${publicationId}"]`
        );


    if (card) {

        card.remove();

    }
}


// ==========================================
// DÉMARRAGE
// ==========================================

loadPublications();
