import { getRequest } from "./api.js";

// Sélectionne l'élément avec la classe "gallery" dans le document
export const dataWorks = await getRequest("http://localhost:5678/api/works");
export const dataCategories = await getRequest("http://localhost:5678/api/categories");

// Élément DOM de la galerie qui va
const galleryContainer = document.querySelector(".gallery");

// Crée et affiche les éléments de la galerie
export function displayGalleryItems(items) {
    // Vide la galerie existante
    galleryContainer.innerHTML = "";
    // Parcourt chaque élément de la liste d'items
    items.forEach(item => {
        // Crée un élément <figure>
        const figureElement = document.createElement("figure");
        // Crée un élément <img>
        const imgElement = document.createElement("img");
        // Crée un élément <img>
        const figcaptionElement = document.createElement("figcaption");
        // Définit la source de l'image
        imgElement.src = item.imageUrl;
        // Définit le texte alternatif de l'image
        imgElement.alt = item.title;
        // Définit le texte du figcaption
        figcaptionElement.textContent = item.title;
        // Ajoute l'image et le figcaption à l'élément figure
        figureElement.append(imgElement, figcaptionElement);
        // Ajoute l'élément figure à la galerie
        galleryContainer.appendChild(figureElement);
    });
}

// Initialise la galerie avec les données des travaux
displayGalleryItems(dataWorks);

// Met à jour les styles des boutons de filtre
function updateFilterButtonStyles(activeButton) {
    // Parcourt chaque bouton avec la classe "filter-btn"
    document.querySelectorAll(".filter-btn").forEach(button => {
        // Ajoute la classe "clicked" si le bouton est le bouton actif, sinon l'enlève
        button.classList.toggle("clicked", button === activeButton);
        // Ajoute la classe "not-clicked" si le bouton n'est pas le bouton actif, sinon l'enlève
        button.classList.toggle("not-clicked", button !== activeButton);
    });
}

// Génère les boutons de filtre
export function renderVisitorMode() {
    // Sélectionne l'élément <h2> dans l'élément avec l'ID "portfolio"
    const portfolioTitleElement = document.querySelector("#portfolio h2");
    // Crée un conteneur div pour les boutons de filtre
    const filterButtonContainer = document.createElement("div");
    // Ajoute la classe "portfolio-filter" au conteneur
    filterButtonContainer.classList.add("portfolio-filter");
    // Insère le conteneur juste après l'élément <h2>
    portfolioTitleElement.insertAdjacentElement("afterend", filterButtonContainer);
    // Crée un bouton de filtre pour la categorie "Tous"
    const allFilterButton = document.createElement("button");
    // Ajoute les classes "filter-btn" et "not-clicked" au bouton
    allFilterButton.classList.add("filter-btn", "not-clicked");
    // Définit le texte du bouton
    allFilterButton.innerText = "Tous";
    // Ajoute un gestionnaire d'événement de clic pour afficher tous les éléments et mettre à jour les styles des boutons
    allFilterButton.addEventListener("click", () => {
        // Affiche tous les éléments de la galerie (appelle de fonction)
        displayGalleryItems(dataWorks);
        // Met à jour les styles des boutons de filtre (appelle de fonction)
        updateFilterButtonStyles(allFilterButton);
    });
    // Ajoute le bouton "Tous" au conteneur
    filterButtonContainer.appendChild(allFilterButton);
    // Parcourt chaque catégorie de données pour créer un bouton de filtre correspondant
    dataCategories.forEach(category => {
        // Crée un bouton de filtre pour chaque catégorie
        const filterButton = document.createElement("button");
        // Ajoute les classes "filter-btn" et "not-clicked" au bouton
        filterButton.classList.add("filter-btn", "not-clicked");
        // Définit le texte du bouton avec le nom de la catégorie
        filterButton.innerText = category.name;
        // Ajoute un gestionnaire d'événement de clic pour filtrer les éléments par catégorie et mettre à jour les styles des boutons
        filterButton.addEventListener("click", () => {
            // Filtre les éléments de la galerie en fonction de l'ID de la catégorie
            const filteredItems = dataWorks.filter(item => item.categoryId === category.id);
            // Affiche les éléments filtrés
            displayGalleryItems(filteredItems);
            // Met à jour les styles des boutons de filtre
            updateFilterButtonStyles(filterButton);
        });
        // Ajoute le bouton de filtre pour la catégorie au conteneur
        filterButtonContainer.appendChild(filterButton);
    });
    // Met à jour les styles des boutons de filtre pour définir "Tous" comme le bouton actif par défaut
    updateFilterButtonStyles(allFilterButton);
}
