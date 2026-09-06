const mainContent = document.getElementById("mainContent");

const discoverButton = document.querySelector(".buttong");
const viewerButton = document.querySelector(".viewe");


// ==========================================
// URL DE TES API XANO
// ==========================================

const API_PUBLICATIONS =
    "https://TON-DOMAINE-XANO/publications";

const API_VIDEOS =
    "https://TON-DOMAINE-XANO/videos";


// ==========================================
// DÉCOUVRIR
// RÉCUPÉRER LES PUBLICATIONS XANO
// ==========================================

async function loadDiscover() {

    try {

        const response =
            await fetch(API_PUBLICATIONS);

        if (!response.ok) {
            throw new Error("Erreur API Xano");
        }

        const publications =
            await response.json();

        console.log("Publications Xano :", publications);


        // Effacer l'ancien affichage
        mainContent.innerHTML = "";


        // Récupérer les données
        publications.forEach(publication => {

            const post =
                document.createElement("article");

            post.className = "post-card";


            /*
             * On récupère les informations
             * venant de Xano.
             */

            post.dataset.id = publication.id;


            // Exemple d'affichage
            post.innerHTML = `

                <div class="post-header">

                    <strong>
                        ${publication.username || ""}
                    </strong>

                </div>


                <div class="post-body">

                    <p>
                        ${publication.content || ""}
                    </p>

                </div>

            `;


            mainContent.appendChild(post);

        });

    } catch (error) {

        console.error(
            "Impossible de récupérer les publications :",
            error
        );

    }

}


// ==========================================
// VIEWER
// RÉCUPÉRER LES VIDÉOS XANO
// ==========================================

async function loadViewer() {

    try {

        const response =
            await fetch(API_VIDEOS);

        if (!response.ok) {
            throw new Error("Erreur API Xano");
        }

        const videos =
            await response.json();

        console.log("Vidéos Xano :", videos);


        mainContent.innerHTML = "";


        videos.forEach(video => {

            const container =
                document.createElement("div");

            container.className =
                "viewer-item";


            const videoElement =
                document.createElement("video");

            videoElement.className =
                "viewer-video";


            videoElement.src =
                video.video_url;


            videoElement.controls = true;


            container.appendChild(videoElement);

            mainContent.appendChild(container);

        });

    } catch (error) {

        console.error(
            "Impossible de récupérer les vidéos :",
            error
        );

    }

}


// ==========================================
// DÉCOUVRIR
// ==========================================

discoverButton.addEventListener("click", () => {

    document.body.classList.remove("viewer-mode");

    mainContent.classList.remove("viewer-mode");
    mainContent.classList.add("feed-mode");


    document.querySelector(".category-bar")
        .style.display = "flex";


    loadDiscover();

});


// ==========================================
// VIEWER
// ==========================================

viewerButton.addEventListener("click", () => {

    document.body.classList.add("viewer-mode");

    mainContent.classList.remove("feed-mode");
    mainContent.classList.add("viewer-mode");


    document.querySelector(".category-bar")
        .style.display = "none";


    loadViewer();

});


// ==========================================
// CHARGEMENT INITIAL
// ==========================================

loadDiscover();
