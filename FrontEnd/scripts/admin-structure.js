import { displayGalleryItems, dataCategories, dataWorks } from "./visitor-structure.js";
import { getRequest, deleteRequest } from "./api.js"; // Importations nettoyées

// Met à jour la galerie de photos et retourne les nouvelles données
async function refreshGallery() {
    const updatedWorks = await getRequest("http://localhost:5678/api/works");
    displayGalleryItems(updatedWorks);
    return updatedWorks;
}

// Supprime un élément
async function removeItem(event) {
    const itemId = event.target.dataset.id; 
    const token = sessionStorage.getItem("authToken");

    const isDeleted = await deleteRequest(`http://localhost:5678/api/works/${itemId}`, token);

    if (isDeleted) {
        event.target.parentElement.remove();
        const updatedWorks = await refreshGallery(); // Obtenez les travaux mis à jour
        renderModalItems(updatedWorks); // Mettez à jour la modale de suppression
    } else {
        console.error("Impossible de supprimer l'élément");
    }
}

// Fonction pour créer les éléments de la galerie dans la modale
async function renderModalItems(items) {
    const modalGalleryContainer = document.querySelector(".modalGallery");
    modalGalleryContainer.innerHTML = "";
    items.forEach(item => {
        const figureElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const deleteIcon = document.createElement("i");
        
        imgElement.src = item.imageUrl;
        imgElement.alt = item.title;
        deleteIcon.classList.add("fas", "fa-trash-alt", "trash-icon");
        deleteIcon.dataset.id = item.id;
        deleteIcon.addEventListener("click", removeItem);
        
        figureElement.append(imgElement, deleteIcon);
        modalGalleryContainer.appendChild(figureElement);
    });
}

// Gère les fenêtres modales
function configureModalWindow(openBtn) {
    const modal = document.getElementById("myModal");
    const closeModal = document.querySelector(".close");

    openBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Fonction pour créer la structure de la modale d'ajout de photo
function setupAddPhotoModal() {
    const bodyElement = document.body;

    const modalContainer = document.createElement("div");
    modalContainer.id = "myModal";
    modalContainer.classList.add("modal");

    bodyElement.appendChild(modalContainer);

    const parentElement = document.getElementById("myModal");
    
    const modalContent = document.createElement("div");
    modalContent.classList.add("modalAddPhoto");

    const backArrowElement = document.createElement("i");
    backArrowElement.classList.add("fa-solid", "fa-arrow-left", "arrow-back");

    const closeModalElement = document.createElement("div");
    closeModalElement.classList.add("close");
    closeModalElement.innerHTML = "&times;";
    
    const titleElement = document.createElement("h2");
    titleElement.classList.add("titleModal1");
    titleElement.innerText = "Ajout photo";

    const addPhotoSection = document.createElement("section");
    addPhotoSection.classList.add("addPhotoContainer");

    const photoInfoSection = document.createElement("div");
    photoInfoSection.classList.add("informationAddPhoto");

    const photoUserSelection = document.createElement("div");
    photoUserSelection.classList.add("photoUserchoice");

    const userImg = document.createElement("img");
    userImg.classList.add("imgUser");
    userImg.style.display = "none";

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    const imgIcon = document.createElement("i");
    imgIcon.classList.add("fa-regular", "fa-image", "image-icon");

    const addButton = document.createElement("button");
    addButton.classList.add("AddPhotoButton");
    addButton.innerText = "+ Ajouter photo";

    const instructions = document.createElement("p");
    instructions.classList.add("modal2Text");
    instructions.innerText = "jpg, png : 4mo max";

    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.style.display = "none";
    errorMessage.style.color = "red";

    const photoForm = document.createElement("form");
    photoForm.id = "formPhotoElement";

    const titleLabel = document.createElement("label");
    titleLabel.classList.add("titre");
    titleLabel.htmlFor = "titre";
    titleLabel.innerText = "Titre";
    
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "titre";
    titleInput.id = "titre";
    
    const categoryLabel = document.createElement("label");
    categoryLabel.classList.add("categorie"); 
    categoryLabel.htmlFor = "categorie";
    categoryLabel.innerText = "Catégorie";
    
    const categorySelect = document.createElement("select");
    categorySelect.name = "categorie";
    categorySelect.id = "categorie";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = "Sélectionner une catégorie";
    categorySelect.append(defaultOption);

    dataCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        categorySelect.append(option);
    });

    const separator = document.createElement("hr");
    separator.classList.add("border");

    const submitButton = document.createElement("input");
    submitButton.id = "btnValiderPhoto";
    submitButton.type = "submit";
    submitButton.value = "Valider";

    parentElement.appendChild(modalContent);
    modalContent.append(closeModalElement, backArrowElement, titleElement, addPhotoSection, photoForm);

    addPhotoSection.append(photoInfoSection, photoUserSelection, errorMessage);
    photoUserSelection.appendChild(userImg);
    photoInfoSection.append(imgIcon, addButton, instructions);

    photoForm.append(titleLabel, titleInput, categoryLabel, categorySelect, separator, submitButton);

    closeModalElement.addEventListener("click", async () => {
        parentElement.style.display = "none";
        const modalAddPhoto = document.querySelector(".modalAddPhoto");
        modalAddPhoto.style.display = "none";
        const modalGallery = document.querySelector(".modalSuprPhoto");
        modalGallery.style.display = "flex";

        photoInfoSection.style.display = "flex";
        photoUserSelection.style.display = "none";
        userImg.style.display = 'none';
        userImg.src = "";
        fileInput.value = '';
        const updatedWorks = await refreshGallery();
        renderModalItems(updatedWorks);
        submitButton.style.backgroundColor = "#A7A7A7";
    });

    backArrowElement.addEventListener("click", async () => {
        const modalAddPhoto = document.querySelector(".modalAddPhoto");
        modalAddPhoto.style.display = "none";
        const modalGallery = document.querySelector(".modalSuprPhoto");
        modalGallery.style.display = "flex";
        
        photoInfoSection.style.display = "flex";
        photoUserSelection.style.display = "none";
        userImg.style.display = 'none';
        userImg.src = "";
        fileInput.value = '';
        const updatedWorks = await refreshGallery();
        renderModalItems(updatedWorks);
        submitButton.style.backgroundColor = "#A7A7A7";
    });

    window.addEventListener("click", async (event) => {
        if (event.target === parentElement) {
            parentElement.style.display = "none";
            const modalAddPhoto = document.querySelector(".modalAddPhoto");
            modalAddPhoto.style.display = "none";
            const modalGallery = document.querySelector(".modalSuprPhoto");
            modalGallery.style.display = "flex";
            
            photoInfoSection.style.display = "flex";
            photoUserSelection.style.display = "none";
            userImg.style.display = 'none';
            userImg.src = "";
            fileInput.value = '';
            const updatedWorks = await refreshGallery();
            renderModalItems(updatedWorks);
            submitButton.style.backgroundColor = "#A7A7A7";
        }
    });

    addButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const validFileTypes = ["image/jpeg", "image/png"];
        const maxSizeInBytes = 4 * 1024 * 1024; // 4MB

        if (file) {
            if (!validFileTypes.includes(file.type)) {
                errorMessage.textContent = "Le fichier doit être au format JPG ou PNG.";
                errorMessage.style.display = "block";
                fileInput.value = ''; // Clear the file input
                return;
            }

            if (file.size > maxSizeInBytes) {
                errorMessage.textContent = "Le fichier doit être inférieur à 4 Mo.";
                errorMessage.style.display = "block";
                fileInput.value = ''; // Clear the file input
                return;
            }

            errorMessage.style.display = "none"; // Clear any previous error messages

            const reader = new FileReader();
            reader.onload = function(e) {
                userImg.src = e.target.result;
                photoInfoSection.style.display = "none";
                photoUserSelection.style.display = "flex";
                userImg.style.display = 'block';
            }
            reader.readAsDataURL(file);

            submitButton.style.backgroundColor = "#1D6154";
        }
    });

    photoForm.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const file = fileInput.files[0];
        const title = titleInput.value.trim();
        const category = categorySelect.value.trim();

        if (!file || !title || !category) {
            console.error("Tous les champs sont obligatoires.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("category", category);

        const token = sessionStorage.getItem("authToken");

        console.log("Submitting form data:", Array.from(formData.entries())); // Journal des données du formulaire
        console.log("Token:", token); // Journal pour le token

        try {
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            console.log("Response status:", response.status); // Journal du statut de la réponse
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Success:", data);

            const updatedWorks = await refreshGallery();
            renderModalItems(updatedWorks); // Met à jour la modale de suppression avec les nouvelles données

        } catch (error) {
            console.error("Erreur", error);
        }

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    });
}
    // } else {
    //     console.error("Aucun fichier sélectionné");


// Fonction pour créer la structure de la modale de suppression de photo
function setupDeletePhotoModal() {
    const bodyElement = document.body;
    const modalContainer = document.createElement("div");
    modalContainer.id = "myModal";
    modalContainer.classList.add("modal");

    bodyElement.appendChild(modalContainer);

    const parentElement = document.getElementById("myModal");
    
    const modalContent = document.createElement("div");
    modalContent.classList.add("modalSuprPhoto");
    
    const closeModalElement = document.createElement("div");
    closeModalElement.classList.add("close");
    closeModalElement.innerHTML = "&times;";
    
    const titleElement = document.createElement("h2");
    titleElement.classList.add("titleModal1");
    titleElement.innerText = "Galerie photo";
    
    const sectionElement = document.createElement("section");
    sectionElement.classList.add("modalGallery");
    
    const separator = document.createElement("hr");
    separator.classList.add("border");
    
    const addButton = document.createElement("button");
    addButton.id = "btn-addImg";
    addButton.innerText = "Ajouter une photo";
    
    parentElement.appendChild(modalContent);
    modalContent.append(closeModalElement, titleElement, sectionElement, separator, addButton);
    
    addButton.addEventListener("click", () => {
        const modalGallery = document.querySelector(".modalSuprPhoto");
        modalGallery.style.display = "none";
        setupAddPhotoModal();
        const modalAddPhoto = document.querySelector(".modalAddPhoto");
        modalAddPhoto.style.display = "flex";
    });
}

// Fonction pour créer la structure de la page admin 
export function renderAdminMode() {
    const loginElement = document.querySelector("li a");
    loginElement.innerText = "logout";
    loginElement.href = "../index.html";
    const firstChild = document.body.firstChild;

    const headbandElement = document.createElement("div");
    headbandElement.classList.add("headbandElement");

    const headbandText = document.createElement("p");
    headbandText.innerText = "Mode édition";

    document.body.insertBefore(headbandElement, firstChild);
    headbandElement.appendChild(headbandText);

    const projectTitleElement = document.querySelector("#portfolio h2");
    const openModalButton = document.createElement("button");
    openModalButton.id = "myBtn";
    openModalButton.innerText = "modifier";
    projectTitleElement.insertAdjacentElement("afterend", openModalButton);

    loginElement.addEventListener("click", () => {
        sessionStorage.removeItem("authToken");
    });

    setupDeletePhotoModal();
    configureModalWindow(openModalButton);
    renderModalItems(dataWorks);
}