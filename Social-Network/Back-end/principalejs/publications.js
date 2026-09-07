// ==========================================
// CONFIGURATION XANO
// ==========================================

const API_PUBLICATIONS =
    "https://x8ki-letl-twmt.n7.xano.io/api:LiDt6uB0/publications";


// ==========================================
// ÉLÉMENT DU FEED
// ==========================================

const feed =
    document.getElementById("feed");


// ==========================================
// CHARGER LES PUBLICATIONS
// ==========================================

async function loadPublications() {

    if (!feed) {
        console.error(
            "❌ L'élément #feed est introuvable."
        );
        return;
    }

    try {

        feed.innerHTML =
            "<p>Chargement des publications...</p>";


        const response =
            await fetch(API_PUBLICATIONS);


        // Vérification HTTP

        if (!response.ok) {

            throw new Error(
                `Erreur HTTP ${response.status}`
            );

        }


        const publications =
            await response.json();


        console.log(
            "📚 Publications Xano :",
            publications
        );


        // ======================================
        // VIDER LE FEED
        // ======================================

        feed.innerHTML = "";


        // ======================================
        // AUCUNE PUBLICATION
        // ======================================

        if (
            !publications ||
            publications.length === 0
        ) {

            feed.innerHTML =
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

                feed.appendChild(card);

            }
        );


    } catch (error) {

        console.error(
            "❌ Impossible de charger les publications :",
            error
        );


        feed.innerHTML = `
            <p>
                ❌ Impossible de charger les publications.
            </p>
        `;
    }
}


// ==========================================
// CRÉER UNE CARTE DE PUBLICATION
// ==========================================

function createPublicationCard(
    publication
) {

    const article =
        document.createElement("article");


    article.className =
        "publication-card";


    // ======================================
    // ID
    // ======================================

    article.dataset.id =
        publication.id;


    // ======================================
    // CONTENU
    // ======================================

    const content =
        publication.content || "";


    // ======================================
    // UTILISATEUR
    // ======================================

    const username =
        publication.username ||
        publication.user?.username ||
        "Utilisateur";


    // ======================================
    // DATE
    // ======================================

    const date =
        publication.created_at ||
        "";


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
// AJOUTER UNE PUBLICATION AU FEED
// ==========================================

function addPublication(
    publication
) {

    if (!feed) {
        return;
    }


    const card =
        createPublicationCard(
            publication
        );


    feed.prepend(card);

}


// ==========================================
// MODIFIER UNE PUBLICATION
// ==========================================

function updatePublication(
    publication
) {

    if (!feed) {
        return;
    }


    const oldCard =
        feed.querySelector(
            `[data-id="${publication.id}"]`
        );


    if (!oldCard) {

        // Si elle n'existe pas encore,
        // on l'ajoute.

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
// ==========================================

function removePublication(
    publicationId
) {

    if (!feed) {
        return;
    }


    const card =
        feed.querySelector(
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
