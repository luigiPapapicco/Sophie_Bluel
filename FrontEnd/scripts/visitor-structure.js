import { getRequest } from "./api.js";

// Récupère les données des travaux et des catégories via des appels API
export const dataWorks = await getRequest("http://localhost:5678/api/works");
export const dataCategories = await getRequest("http://localhost:5678/api/categories");

// Élément DOM de la galerie
const galleryContainer = document.querySelector(".gallery");

// Crée et affiche les éléments de la galerie
export function displayGalleryItems(items) {
    galleryContainer.innerHTML = ""; // Vide la galerie existante
    items.forEach(item => {
        const figureElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const figcaptionElement = document.createElement("figcaption");
        
        imgElement.src = item.imageUrl;
        imgElement.alt = item.title;
        figcaptionElement.textContent = item.title;
        
        figureElement.append(imgElement, figcaptionElement);
        galleryContainer.appendChild(figureElement);
    });
}

// Initialise la galerie avec les données des travaux
displayGalleryItems(dataWorks);

// Met à jour les styles des boutons de filtre
function updateFilterButtonStyles(activeButton) {
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.classList.toggle("clicked", button === activeButton);
        button.classList.toggle("not-clicked", button !== activeButton);
    });
}

// Génère les boutons de filtre
export function renderVisitorMode() {
    const portfolioTitleElement = document.querySelector("#portfolio h2");
    const filterButtonContainer = document.createElement("div");
    filterButtonContainer.classList.add("portfolio-filter");
    portfolioTitleElement.insertAdjacentElement("afterend", filterButtonContainer);
    
    const allFilterButton = document.createElement("button");
    allFilterButton.classList.add("filter-btn", "not-clicked");
    allFilterButton.innerText = "Tous";
    allFilterButton.addEventListener("click", () => {
        displayGalleryItems(dataWorks);
        updateFilterButtonStyles(allFilterButton);
    });
    filterButtonContainer.appendChild(allFilterButton);

    dataCategories.forEach(category => {
        const filterButton = document.createElement("button");
        filterButton.classList.add("filter-btn", "not-clicked");
        filterButton.innerText = category.name;
        filterButton.addEventListener("click", () => {
            const filteredItems = dataWorks.filter(item => item.categoryId === category.id);
            displayGalleryItems(filteredItems);
            updateFilterButtonStyles(filterButton);
        });
        filterButtonContainer.appendChild(filterButton);
    });

    updateFilterButtonStyles(allFilterButton);
}
