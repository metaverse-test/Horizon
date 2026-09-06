const searchIcon = document.getElementById("searchIcon");
const searchInput = document.querySelector(".search");

if (searchIcon && searchInput) {

  // Ouvrir / fermer la recherche
  searchIcon.addEventListener("click", function(e) {

    e.stopPropagation();

    searchInput.classList.toggle("active");
    searchIcon.classList.toggle("active");

    if (searchInput.classList.contains("active")) {
      searchInput.focus();
    } else {
      searchInput.blur();
    }

  });


  // Empêcher la fermeture quand on clique dans l'input
  searchInput.addEventListener("click", function(e) {
    e.stopPropagation();
  });


  // Fermer en cliquant ailleurs
  document.addEventListener("click", function(e) {

    if (
      !searchIcon.contains(e.target) &&
      !searchInput.contains(e.target)
    ) {

      searchInput.classList.remove("active");
      searchIcon.classList.remove("active");

    }

  });


  // Gestion du clavier
  searchInput.addEventListener("keydown", function(e) {

    // ESC
    if (e.key === "Escape") {

      searchInput.classList.remove("active");
      searchIcon.classList.remove("active");

      searchInput.value = "";
      searchInput.blur();

    }


    // ENTER
    if (e.key === "Enter") {

      const query = searchInput.value.trim();

      if (query !== "") {

        console.log("Recherche :", query);

      }

    }

  });

}
