

import { displayGalleryItems, dataCategories, dataWorks } from "./visitor-structure.js";
import { getRequest, deleteRequest } from "./api.js";

// Met à jour la galerie de photos et retourne les nouvelles données
async function refreshGallery() {

    // Envoie une requête GET pour obtenir les travaux mis à jour depuis l'API (appelle fonction)
    const updatedWorks = await getRequest("http://localhost:5678/api/works");
    // Affiche les travaux mis à jour dans la galerie
    displayGalleryItems(updatedWorks);

    // Retourne les nouvelles données des travaux
    return updatedWorks;
}

// Supprime un élément
async function removeItem(event) {
    // Récupère l'ID de l'élément à partir de l'attribut data-id de la cible de l'événement
    const itemId = event.target.dataset.id; 
    // Récupère le jeton d'authentification depuis le sessionStorage
    const token = sessionStorage.getItem("authToken");
    // Envoie une requête DELETE pour supprimer l'élément avec l'ID spécifié
    const isDeleted = await deleteRequest(`http://localhost:5678/api/works/${itemId}`, token);
    // Si la suppression a réussi
    if (isDeleted) {
        // Supprime l'élément parent de la cible de l'événement du DOM
        event.target.parentElement.remove();
        // Rafraîchit la galerie et obtient les travaux mis à jour
        const updatedWorks = await refreshGallery();
        // Met à jour la modale de suppression avec les travaux mis à jour
        renderModalItems(updatedWorks); 
        // Sinon
    } else {
        // Affiche une erreur dans la console si la suppression a échoué
        console.error("Impossible de supprimer l'élément");
    }
}

// Fonction pour créer les éléments de la galerie dans la modale
async function renderModalItems(items) {
    // Sélectionne l'élément avec la classe "modalGallery" dans le document
    const modalGalleryContainer = document.querySelector(".modalGallery");
    // Vide le conteneur de la galerie modale
    modalGalleryContainer.innerHTML = "";
    // Parcourt chaque élément de la liste d'items
    items.forEach(item => {
        // Crée un élément <figure>
        const figureElement = document.createElement("figure");
        // Crée un élément <img>
        const imgElement = document.createElement("img");
        // Crée un élément <i> pour l'icône de suppression
        const deleteIcon = document.createElement("i");
        // Définit la source de l'image
        imgElement.src = item.imageUrl;
        // Définit le texte alternatif de l'image
        imgElement.alt = item.title;
        // Ajoute les classes pour l'icône de suppression
        deleteIcon.classList.add("fas", "fa-trash-alt", "trash-icon");
        // Ajoute l'ID de l'élément à supprimer en tant que data-id
        deleteIcon.dataset.id = item.id;
        // Ajoute un gestionnaire d'événement de clic pour supprimer l'élément
        deleteIcon.addEventListener("click", removeItem);
        // Ajoute l'image et l'icône de suppression à l'élément figure
        figureElement.append(imgElement, deleteIcon);
        // Ajoute l'élément figure au conteneur de la galerie modale
        modalGalleryContainer.appendChild(figureElement);
    });
}

// Gère les fenêtres modales
function configureModalWindow(openBtn) {
    // Sélectionne l'élément avec l'ID "myModal" dans le document
    const modal = document.getElementById("myModal");
    // Sélectionne l'élément avec la classe "close" dans le document
    const closeModal = document.querySelector(".close");
    // Ajoute un gestionnaire d'événement de clic pour ouvrir la modale
    openBtn.addEventListener("click", () => {
        // Définit l'affichage de la modale sur "flex"
        modal.style.display = "flex";
    });
    // Ajoute un gestionnaire d'événement de clic pour fermer la modale
    closeModal.addEventListener("click", () => {
        // Définit l'affichage de la modale sur "none"
        modal.style.display = "none";
    });
    // Ajoute un gestionnaire d'événement de clic pour fermer la modale lorsque l'utilisateur clique en dehors de celle-ci
    window.addEventListener("click", (event) => {
        // Vérifie si la cible de l'événement est la modale
        if (event.target === modal) {
            // Définit l'affichage de la modale sur "none"
            modal.style.display = "none";
        }
    });
}

// Fonction pour créer la structure de la modale d'ajout de photo
function setupAddPhotoModal() {
    // Sélectionne l'élément body du document
    const bodyElement = document.body;
    // Crée un conteneur div pour la modale
    const modalContainer = document.createElement("div");
    // Définit l'ID de la modale
    modalContainer.id = "myModal";
    // Ajoute la classe "modal" au conteneur de la modale
    modalContainer.classList.add("modal");
    // Ajoute le conteneur de la modale au body
    bodyElement.appendChild(modalContainer);
    // Sélectionne l'élément de la modale
    const parentElement = document.getElementById("myModal");
    // Crée un conteneur div pour le contenu de la modale
    const modalContent = document.createElement("div");
    // Ajoute la classe "modalAddPhoto" au contenu de la modale
    modalContent.classList.add("modalAddPhoto");
    // Crée un élément pour la flèche de retour
    const backArrowElement = document.createElement("i");
    // Ajoute les classes pour la flèche de retour
    backArrowElement.classList.add("fa-solid", "fa-arrow-left", "arrow-back");
    // Crée un élément div pour fermer la modale
    const closeModalElement = document.createElement("div");
    // Ajoute la classe "close" à l'élément de fermeture
    closeModalElement.classList.add("close");
    // Définit le contenu HTML de l'élément de fermeture
    closeModalElement.innerHTML = "&times;";
    // Crée un élément h2 pour le titre de la modale
    const titleElement = document.createElement("h2");
    // Ajoute la classe "titleModal1" au titre
    titleElement.classList.add("titleModal1");
    // Définit le texte du titre
    titleElement.innerText = "Ajout photo";
    // Crée un élément section pour la section d'ajout de photo
    const addPhotoSection = document.createElement("section");
    // Ajoute la classe "addPhotoContainer" à la section
    addPhotoSection.classList.add("addPhotoContainer");
    // Crée un élément div pour les informations sur la photo
    const photoInfoSection = document.createElement("div");
    // Ajoute la classe "informationAddPhoto" à la section d'informations
    photoInfoSection.classList.add("informationAddPhoto");
    // Crée un élément div pour la sélection de la photo par l'utilisateur
    const photoUserSelection = document.createElement("div");
    // Ajoute la classe "photoUserchoice" à la section de sélection de la photo
    photoUserSelection.classList.add("photoUserchoice");
    // Crée un élément img pour afficher la photo de l'utilisateur
    const userImg = document.createElement("img");
    // Ajoute la classe "imgUser" à l'image
    userImg.classList.add("imgUser");
    // Cache l'image initialement
    userImg.style.display = "none";
    // Crée un élément input pour la sélection du fichier
    const fileInput = document.createElement('input');
    // Définit le type d'input comme file
    fileInput.type = 'file';
    // Accepte uniquement les fichiers image
    fileInput.accept = 'image/*';
    // Cache l'input initialement
    fileInput.style.display = 'none';
    // Crée un élément i pour l'icône d'image
    const imgIcon = document.createElement("i");
    // Ajoute les classes pour l'icône d'image
    imgIcon.classList.add("fa-regular", "fa-image", "image-icon");
    // Crée un bouton pour ajouter une photo
    const addButton = document.createElement("button");
    // Ajoute la classe "AddPhotoButton" au bouton
    addButton.classList.add("AddPhotoButton");
    // Définit le texte du bouton
    addButton.innerText = "+ Ajouter photo";
    // Crée un élément p pour les instructions de format de fichier
    const instructions = document.createElement("p");
    // Ajoute la classe "modal2Text" aux instructions
    instructions.classList.add("modal2Text");
    // Définit le texte des instructions
    instructions.innerText = "jpg, png : 4mo max";
    // Crée un élément p pour afficher les messages d'erreur
    const errorMessage = document.createElement("p");
    // Ajoute la classe "error-message" aux messages d'erreur
    errorMessage.classList.add("error-message");
    // Cache les messages d'erreur initialement
    errorMessage.style.display = "none";
    // Définit la couleur des messages d'erreur
    errorMessage.style.color = "red";
    // Crée un formulaire pour l'ajout de photo
    const photoForm = document.createElement("form");
    // Définit l'ID du formulaire
    photoForm.id = "formPhotoElement";
    // Crée un label pour le titre de la photo
    const titleLabel = document.createElement("label");
    // Ajoute la classe "titre" au label
    titleLabel.classList.add("titre");
    // Associe le label à l'input de titre
    titleLabel.htmlFor = "titre";
    // Définit le texte du label
    titleLabel.innerText = "Titre";
    // Crée un input pour le titre de la photo
    const titleInput = document.createElement("input");
    // Définit le type d'input comme text
    titleInput.type = "text";
    // Définit le nom de l'input
    titleInput.name = "titre";
    // Définit l'ID de l'input
    titleInput.id = "titre";
    // Crée un label pour la catégorie de la photo
    const categoryLabel = document.createElement("label");
    // Ajoute la classe "categorie" au label
    categoryLabel.classList.add("categorie"); 
    // Associe le label à l'input de catégorie
    categoryLabel.htmlFor = "categorie";
    // Définit le texte du label
    categoryLabel.innerText = "Catégorie";
    // Crée un select pour les catégories de la photo
    const categorySelect = document.createElement("select");
    // Définit le nom du select
    categorySelect.name = "categorie";
    // Définit l'ID du select
    categorySelect.id = "categorie";
    // Crée une option par défaut pour le select
    const defaultOption = document.createElement("option");
    // Définit la valeur de l'option par défaut
    defaultOption.value = "";
    // Définit le texte de l'option par défaut
    defaultOption.innerText = "Sélectionner une catégorie";
    // Ajoute l'option par défaut au select
    categorySelect.append(defaultOption);
    // Parcourt chaque catégorie de données pour créer une option correspondante
    dataCategories.forEach(category => {
        // Crée une option pour chaque catégorie
        const option = document.createElement("option");
        // Définit la valeur de l'option comme l'ID de la catégorie
        option.value = category.id;
        // Définit le texte de l'option comme le nom de la catégorie
        option.innerText = category.name;
        // Ajoute l'option au select
        categorySelect.append(option);
    });
    // Crée un élément hr pour séparer les sections du formulaire
    const separator = document.createElement("hr");
    // Ajoute la classe "border" au séparateur
    separator.classList.add("border");
    // Crée un bouton de soumission pour le formulaire
    const submitButton = document.createElement("input");
    // Définit l'ID du bouton de soumissio
    submitButton.id = "btnValiderPhoto";
    // Définit le type du bouton comme submit
    submitButton.type = "submit";
    // Définit le texte du bouton
    submitButton.value = "Valider";
    // Ajoute le contenu de la modale au conteneur de la modale
    parentElement.appendChild(modalContent);
    // Ajoute les éléments à la modale
    modalContent.append(closeModalElement, backArrowElement, titleElement, addPhotoSection, photoForm);
    // Ajoute les sections d'informations et de sélection de photo à la section d'ajout de photo
    addPhotoSection.append(photoInfoSection, photoUserSelection, errorMessage);
    // Ajoute l'image de l'utilisateur à la section de sélection de photo
    photoUserSelection.appendChild(userImg);
    // Ajoute l'icône d'image, le bouton d'ajout et les instructions à la section d'informations
    photoInfoSection.append(imgIcon, addButton, instructions);
    // Ajoute les éléments de formulaire (titre, catégorie, séparateur, bouton de soumission) au formulaire
    photoForm.append(titleLabel, titleInput, categoryLabel, categorySelect, separator, submitButton);
    // Ajoute un gestionnaire d'événement de clic pour fermer la modale
    closeModalElement.addEventListener("click", async () => {
        // Cache la modale
        parentElement.style.display = "none";
        // Sélectionne l'élément de la modale d'ajout de photo
        const modalAddPhoto = document.querySelector(".modalAddPhoto");
        // Cache la modale d'ajout de photo
        modalAddPhoto.style.display = "none";
        // Affiche la modale de suppression de phot
        const modalGallery = document.querySelector(".modaOlSuprPhoto");
        // Sélectionne l'élément de la modale de suppression de photo
        modalGallery.style.display = "flex";
        // Affiche la section d'information de la photo en réglant son affichage sur "flex"
        photoInfoSection.style.display = "flex";
        // Cache la sélection de photo de l'utilisateur en réglant son affichage sur "none"
        photoUserSelection.style.display = "none";
        // Cache l'image de l'utilisateur en réglant son affichage sur "none"
        userImg.style.display = 'none';
        // Réinitialise la source de l'image de l'utilisateur
        userImg.src = "";
        // Réinitialise la valeur de l'input de fichier à une chaîne vide
        fileInput.value = '';
        // Rafraîchit la galerie et obtient les travaux mis à jour en attendant la fin de l'appel asynchrone
        const updatedWorks = await refreshGallery();
        // Rend les éléments de la modale avec les travaux mis à jour
        renderModalItems(updatedWorks);
        // Change la couleur de fond du bouton de soumission pour une couleur grise
        submitButton.style.backgroundColor = "#A7A7A7";
    });
    // Ajoute un gestionnaire d'événement de clic pour la flèche de retour
    backArrowElement.addEventListener("click", async () => {
        // Sélectionne l'élément de la modale d'ajout de photo
        const modalAddPhoto = document.querySelector(".modalAddPhoto");
        // Cache la modale d'ajout de photo
        modalAddPhoto.style.display = "none";
        // Sélectionne l'élément de la modale via sa class
        const modalGallery = document.querySelector(".modalSuprPhoto");
        // Affiche la modale de suppression de photo
        modalGallery.style.display = "flex";
        // Affiche la section d'information de la photo
        photoInfoSection.style.display = "flex";
        // Cache la sélection de photo de l'utilisateur
        photoUserSelection.style.display = "none";
        // Cache l'image de l'utilisateur
        userImg.style.display = 'none';
        // Réinitialise la source de l'image de l'utilisateur
        userImg.src = "";
        // Réinitialise la valeur de l'input de fichier à une chaîne vide
        fileInput.value = '';
        // Rafraîchit la galerie et obtient les travaux mis à jour en attendant la fin de l'appel asynchrone
        const updatedWorks = await refreshGallery();
        // Rend les éléments de la modale avec les travaux mis à jour
        renderModalItems(updatedWorks);
        // Change la couleur de fond du bouton de soumission pour une couleur grise
        submitButton.style.backgroundColor = "#A7A7A7";
    });

    // Ajoute un gestionnaire d'événement de clic sur la fenêtre
    window.addEventListener("click", async (event) => {
        // Vérifie si l'élément cible de l'événement est le parent de la modale
        if (event.target === parentElement) {
            // Cache le parent de la modale
            parentElement.style.display = "none";
            // Sélectionne l'élément de la modale d'ajout de photo
            const modalAddPhoto = document.querySelector(".modalAddPhoto");
            // Cache la modale d'ajout de photo
            modalAddPhoto.style.display = "none";
            // Sélectionne l'élément de la modale de suppression de photo
            const modalGallery = document.querySelector(".modalSuprPhoto");
            // Affiche la modale de suppression de photo
            modalGallery.style.display = "flex";
            // Affiche la section d'information
            photoInfoSection.style.display = "flex";
            // Cache la sélection de photo de l'utilisateur
            photoUserSelection.style.display = "none";
            // Cache l'image de l'utilisateur
            userImg.style.display = 'none';
            // Réinitialise la source de l'image
            userImg.src = "";
            // Réinitialise la valeur de l'input
            fileInput.value = '';
            // Rafraîchit la galerie et obtient les travaux mis à jour en attendant la fin de l'appel asynchrone
            const updatedWorks = await refreshGallery();
            // Rend les éléments de la modale avec les travaux mis à jour
            renderModalItems(updatedWorks);
            // Change la couleur de fond du bouton de soumission pour une couleur grise
            submitButton.style.backgroundColor = "#A7A7A7";
        }
    });
    // Ajoute un gestionnaire d'événement de clic pour le bouton d'ajout
    addButton.addEventListener("click", () => {
        // Déclenche un clic sur l'input de fichier
        fileInput.click();
    });

    // Ajoute un gestionnaire d'événement pour le changement de valeur du champ de fichier
    fileInput.addEventListener('change', (event) => {
        // Récupère le premier fichier sélectionné par l'utilisateur
        const file = event.target.files[0];
        // Déclare un tableau des types de fichiers valides
        const validFileTypes = ["image/jpeg", "image/png"];
        // Déclare la taille maximale du fichier en octets (4 Mo)
        const maxSizeInBytes = 4 * 1024 * 1024; // 4MB
        // Vérifie si un fichier a été sélectionné
        if (file) {
            // Vérifie si le type du fichier n'est pas valide
            if (!validFileTypes.includes(file.type)) {
                // Affiche un message d'erreur si le fichier n'est pas au format JPG ou PNG
                errorMessage.textContent = "Le fichier doit être au format JPG ou PNG.";
                // passe le display du message en block pour l'afficher
                errorMessage.style.display = "block";
                // Réinitialise la valeur du champ de fichier
                fileInput.value = '';
                return;
            }
            // Vérifie si la taille du fichier dépasse la taille maximale autorisée
            if (file.size > maxSizeInBytes) {
                // Affiche un message d'erreur si le fichier est trop volumineux
                errorMessage.textContent = "Le fichier doit être inférieur à 4 Mo.";
                // passe le display du message en block pour l'afficher
                errorMessage.style.display = "block";
                // Réinitialise la valeur du champ de fichier
                fileInput.value = '';
                return;
            }
            // Masque les messages d'erreur précédents
            errorMessage.style.display = "none"; // Clear any previous error messages
            // Crée un nouvel objet FileReader pour lire le contenu du fichier
            const reader = new FileReader();
            // Définit une fonction à exécuter lorsque le fichier est chargé
            reader.onload = function(e) {
                // Définit la source de l'image utilisateur sur le résultat du lecteur de fichier
                userImg.src = e.target.result;
                // Masque la section d'information de la photo
                photoInfoSection.style.display = "none";
                // Affiche la sélection de photo de l'utilisateur
                photoUserSelection.style.display = "flex";
                // Affiche l'image de l'utilisateur
                userImg.style.display = 'block';
            }
            // Lit le contenu du fichier sous forme d'URL de données
            reader.readAsDataURL(file);
            // Change la couleur de fond du bouton de soumission pour indiquer qu'il est actif
            submitButton.style.backgroundColor = "#1D6154";
        }
    });
    // Ajoute un gestionnaire d'événement pour la soumission du formulaire de photo
    photoForm.addEventListener("submit", async (event) => {
        // Empêche le comportement par défaut de soumission du formulaire
        event.preventDefault();
        // Récupère le premier fichier sélectionné par l'utilisateur
        const file = fileInput.files[0];
        // Récupère le titre entré par l'utilisateur et enlève les espaces en début et fin
        const title = titleInput.value.trim();
        // Récupère la catégorie sélectionnée par l'utilisateur et enlève les espaces en début et fin
        const category = categorySelect.value.trim();
        // Vérifie si le fichier, le titre ou la catégorie sont manquants
        if (!file || !title || !category) {
            // Affiche une erreur dans la console si un des champs est manquant
            console.error("Tous les champs sont obligatoires.");
            return;
        }
        // Crée un nouvel objet FormData pour contenir les données du formulaire
        const formData = new FormData();
        // Ajoute le fichier au FormData sous le nom "image"
        formData.append("image", file);
        // Ajoute le titre au FormData sous le nom "title"
        formData.append("title", title);
        // Ajoute la catégorie au FormData sous le nom "category
        formData.append("category", category);
        // Récupère le token d'authentification depuis le sessionStorage
        const token = sessionStorage.getItem("authToken");


        try {
            // Envoie une requête POST pour soumettre les données du formulaire
            const response = await fetch("http://localhost:5678/api/works", {
                // choix du verb html "post" pour publier
                method: "POST",
                // Ajoute l'en-tête d'autorisation avec le token
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                // Ajoute le FormData en tant que corps de la requête
                body: formData
            });
            if (!response.ok) {
                // Vérifie si la réponse n'est pas correcte
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Rafraîchit la galerie et obtient les travaux mis à jour
            const updatedWorks = await refreshGallery();
            // Met à jour la modale de suppression avec les nouvelles données
            renderModalItems(updatedWorks);
            // ferme la modal a l'ajout de la photo
            document.getElementById("myModal").style.display = "none";

            // ******************************************************
            // Sélectionne l'élément de la modale d'ajout de photo
            const modalAddPhoto = document.querySelector(".modalAddPhoto");
            // Cache la modale d'ajout de photo
            modalAddPhoto.style.display = "none";
            // Sélectionne l'élément de la modale via sa class
            const modalGallery = document.querySelector(".modalSuprPhoto");
            // Affiche la modale de suppression de photo
            modalGallery.style.display = "flex";
            // Affiche la section d'information de la photo
            photoInfoSection.style.display = "flex";
            // Cache la sélection de photo de l'utilisateur
            photoUserSelection.style.display = "none";
            // Cache l'image de l'utilisateur
            userImg.style.display = 'none';
            // Réinitialise la source de l'image de l'utilisateur
            userImg.src = "";
            // Réinitialise la valeur de l'input de fichier à une chaîne vide
            fileInput.value = '';
            // Change la couleur de fond du bouton de soumission pour une couleur grise
            submitButton.style.backgroundColor = "#A7A7A7";
            // ******************************************************

        } catch (error) {
             // Affiche une erreur dans la console si une exception se produit
            console.error("Erreur", error);
        }
    });
}

// Fonction pour créer la structure de la modale de suppression de photo
function setupDeletePhotoModal() {
    // Sélectionne l'élément body du document
    const bodyElement = document.body;
    // Crée un conteneur pour la modale
    const modalContainer = document.createElement("div");
    // Assigne un ID au conteneur de la modale
    modalContainer.id = "myModal";
    // Ajoute une classe "modal" au conteneur
    modalContainer.classList.add("modal");
    // Ajoute le conteneur de la modale au body du document
    bodyElement.appendChild(modalContainer);
    // Sélectionne l'élément parent de la modale à partir de son ID
    const parentElement = document.getElementById("myModal");
     // Crée le contenu de la modale
    const modalContent = document.createElement("div");
    // Ajoute une classe "modalSuprPhoto" au contenu de la modale
    modalContent.classList.add("modalSuprPhoto");
    // Crée un élément pour fermer la modale
    const closeModalElement = document.createElement("div");
    // Ajoute une classe "close" à l'élément de fermeture
    closeModalElement.classList.add("close");
    // Définit le contenu HTML de l'élément de fermeture pour afficher un "x"
    closeModalElement.innerHTML = "&times;";
    // Crée un élément de titre pour la modale
    const titleElement = document.createElement("h2");
    // Ajoute une classe "titleModal1" à l'élément de titre
    titleElement.classList.add("titleModal1");
    // Définit le texte du titre
    titleElement.innerText = "Galerie photo";
    // Crée une section pour la galerie de la modale
    const sectionElement = document.createElement("section");
    // Ajoute une classe "modalGallery" à la section
    sectionElement.classList.add("modalGallery");
    // Crée un séparateur horizontal
    const separator = document.createElement("hr");
    // Ajoute une classe "border" au séparateur
    separator.classList.add("border");
    // Crée un bouton pour ajouter une photo
    const addButton = document.createElement("button");
    // Assigne un ID au bouton
    addButton.id = "btn-addImg";
    // Définit le texte du bouton
    addButton.innerText = "Ajouter une photo";
    // Ajoute le contenu de la modale à l'élément parent
    parentElement.appendChild(modalContent);
    // Ajoute les éléments enfants au contenu de la modale
    modalContent.append(closeModalElement, titleElement, sectionElement, separator, addButton);
    // Ajoute un gestionnaire d'événement de clic au bouton d'ajout
    addButton.addEventListener("click", () => {
        // Sélectionne la modale de suppression de photo
        const modalGallery = document.querySelector(".modalSuprPhoto");
        // Cache la modale de suppression de photo
        modalGallery.style.display = "none";
        // Configure la modale d'ajout de photo
        setupAddPhotoModal();
        // Sélectionne la modale d'ajout de photo
        const modalAddPhoto = document.querySelector(".modalAddPhoto");
        // Affiche la modale d'ajout de photo
        modalAddPhoto.style.display = "flex";
    });
}

// Fonction pour créer la structure de la page admin 
export function renderAdminMode() {
    // Sélectionne l'élément de login (le lien "li a")
    const loginElement = document.querySelector("li a");
    // Change le texte du lien de "login" à "logout"
    loginElement.innerText = "logout";
    // Change le href du lien pour rediriger vers la page d'accueil
    loginElement.href = "../index.html";
    // Sélectionne le premier enfant du body
    const firstChild = document.body.firstChild;
    // Crée un nouvel élément div pour le bandeau
    const headbandElement = document.createElement("div");
    // Ajoute la classe "headbandElement" au div
    headbandElement.classList.add("headbandElement");
    // Crée un paragraphe pour le texte du bandeau
    const headbandText = document.createElement("p");
    // Définit le texte du paragraphe
    headbandText.innerText = "Mode édition";
    // Insère le bandeau avant le premier enfant du body
    document.body.insertBefore(headbandElement, firstChild);
    // Ajoute le texte du bandeau au div du bandeau
    headbandElement.appendChild(headbandText);
    // Sélectionne l'élément titre du projet dans la section portfolio
    const projectTitleElement = document.querySelector("#portfolio h2");
    // Crée un bouton pour ouvrir la modale
    const openModalButton = document.createElement("button");
    // Assigne un ID au bouton
    openModalButton.id = "myBtn";
    // Définit le texte du bouton
    openModalButton.innerText = "modifier";
    // Insère le bouton immédiatement après l'élément titre du projet
    projectTitleElement.insertAdjacentElement("afterend", openModalButton);
    // Ajoute un gestionnaire d'événement de clic au lien de logout
    loginElement.addEventListener("click", () => {
        // Supprime le token d'authentification de sessionStorage
        sessionStorage.removeItem("authToken");
    });
    // Configure la modale de suppression de photo
    setupDeletePhotoModal();
    // Configure la fenêtre modale avec le bouton d'ouverture
    configureModalWindow(openModalButton);
    // Rend les éléments de la modale avec les données des travaux
    renderModalItems(dataWorks);
}