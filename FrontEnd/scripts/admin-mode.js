import { createWorksElement } from "./dynamics-elements.js"

// fonction permettant d'effacer un element
async function deleteElement(event) {
    // Récupérer l'ID de l'élément à supprimer
    const elementId = event.target.dataset.id; 
    const token = sessionStorage.getItem("authToken"); // Récupérer le token d'authentification

    if (!token) {
        console.error("No auth token found.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5678/api/works/${elementId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }

        });

        if (response.ok) {
            // Suppression réussie, mettre à jour l'interface utilisateur
            event.target.parentElement.remove();
            // appell a mon api
            const updatedWorksResponse = await fetch("http://localhost:5678/api/works");
            const updatedDataWorks = await updatedWorksResponse.json();
            // remise a jour automatique de ma fenetre principal en faisant appel a ma fonction
            createWorksElement(updatedDataWorks);
        } else {
            console.error("Failed to delete the element.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// fonction de mise a jour de mes photos
function createModalElement(element) {
    const parentElement = document.querySelector(".modalGallery");
    parentElement.innerHTML = "";
    for (let i = 0; i < element.length; i++) {
        const figureElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        // récupération des informations utiles pour maj
        imgElement.src = element[i].imageUrl;
        imgElement.alt = element[i].title;
        // création de l'icone pour supprimer un élément
        const deleteElementIcon = document.createElement("i");
        deleteElementIcon.classList.add("fas", "fa-trash-alt", "trash-icon")
        // récupération des id
        deleteElementIcon.dataset.id = element[i].id
        // ajout de l'écouteur d'événement pour la suppression
        deleteElementIcon.addEventListener("click", deleteElement);
        // append à l'élément du DOM
        figureElement.appendChild(imgElement);
        figureElement.appendChild(deleteElementIcon);
        parentElement.appendChild(figureElement);
    }
}

// fonction gerant le comportement de ma boite modal
function modalWindows(openBtn) {
    const modal = document.getElementById("myModal")
    const closeElement = document.querySelector(".close")

    // gestion de l'ouverture de la fenetre en passant ma class en dispaly block
    openBtn.addEventListener("click", () => {
        modal.style.display = "flex"
    })

    // gestion de la fermeture de la fenetre en passant mon span en display "none"
    closeElement.addEventListener("click", () => {
        modal.style.display = "none"
    })

    // gestion de la fermeture de la fenetre en cas de click a l'exterieur de la fenetre modal
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"
        }
    })
}

// fonction pour créer ma fenetre modal
function modalGalleryWindow() {
    const parentElement = document.getElementById("myModal")
    
    const modalContent = document.createElement("div")
    modalContent.classList.add("modal-content")
    
    const closeElement = document.createElement("div")
    closeElement.classList.add("close")
    closeElement.innerHTML = "&times;"
    
    const titleElement = document.createElement("h2")
    titleElement.classList.add("titleModal1")
    titleElement.innerText = "Galerie photo"
    
    const sectionElement = document.createElement("section")
    sectionElement.classList.add("modalGallery")
    
    const hrElement = document.createElement("hr")
    hrElement.classList.add("border")
    
    const buttonElement = document.createElement("button")
    buttonElement.id = "btn-addImg"
    buttonElement.innerText = "Ajouter une photo"
    
    parentElement.appendChild(modalContent)
    modalContent.append(closeElement, titleElement, sectionElement, hrElement, buttonElement)
}


// gestion du mode admin
export async function adminStructure() {

    // mise en place du logout a la place du login
    const loginElement = document.querySelector("li a")
    loginElement.innerText = "logout"
    loginElement.href = "../index.html"
    
    // mise en place du panneau "mode édition"
    const firstChild = document.body.firstChild
    
    const headbandElement = document.createElement("div")
    headbandElement.classList.add("headbandElement")
    
    const headbandParagraphe = document.createElement("p")
    headbandParagraphe.innerText = "Mode édition"
    
    // append des element
    document.body.insertBefore(headbandElement, firstChild)
    headbandElement.appendChild(headbandParagraphe)
    
    // mise en place de la section modifier a côté de la section Mes projets
    const mesProjetElement = document.querySelector("#portfolio h2")
    const openModalBtn = document.createElement("button")
    openModalBtn.id = "myBtn"
    openModalBtn.innerText = "modifier"
    
    mesProjetElement.insertAdjacentElement("afterend", openModalBtn)

    // gestion de la déconnexion lors du click sur le liens logout

    loginElement.addEventListener("click", () => {
        sessionStorage.removeItem("authToken")
    })
    
    // ----------------------------------------------------------------- 
    // création de la 1ere modal
    modalGalleryWindow()

    // mise en place du comportement de la modal
    modalWindows(openModalBtn)   

    // affichage des projet dans ma modal prevenant du serveur
    const worksReponse = await fetch("http://localhost:5678/api/works")
    const dataWorks = await worksReponse.json()

    // mise en place de la function pour afficher les élements dans ma modal
    createModalElement(dataWorks)

    

    // ---------------------------------------------------------------

}


