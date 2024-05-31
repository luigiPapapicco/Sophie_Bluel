// appel a mon api pour les travaux de l'artiste
const worksReponse = await fetch("http://localhost:5678/api/works")
const dataWorks = await worksReponse.json()



// variable contenant mon élément du DOM qui acceuillera mes nouvelle div
const galleryElement = document.querySelector(".gallery")
// fuction créant les balise avec pour paramètre un élément cibler
function createWorksElement(element) {
    galleryElement.innerHTML = ""
    for (let i = 0 ; i < element.length ; i++) {
        const figureElement = document.createElement("figure")
        const imgElement = document.createElement("img")
        const figcaptionElement = document.createElement("figcaption")
        // récupération des informations utiles pour maj
        imgElement.src = element[i].imageUrl
        imgElement.alt = element[i].title
        figcaptionElement.textContent = element[i].title
        // append a l'élement du DOM
        galleryElement.appendChild(figureElement)
        figureElement.append(imgElement, figcaptionElement)
    }
}

// génération des mes information via ma fonction
createWorksElement(dataWorks)

// Fonction pour mettre à jour les styles des boutons
function updateButtonStyles(activeButton) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(button => {
        button.classList.remove("clicked");
        button.classList.add("not-clicked");
    });
    activeButton.classList.remove("not-clicked");
    activeButton.classList.add("clicked");
}

// *******************************************************************
// création de mes bouton filtres
// appel des information categorie via mon api
const categoriesReponse = await fetch("http://localhost:5678/api/categories")
const dataCategorie = await categoriesReponse.json()

// récupération de ma balise parent
const sectionEtTitreElement = document.querySelector("#portfolio h2")
// création d'une balise div contenant mes bouton
const divElementFilterBtn = document.createElement("div")
divElementFilterBtn.classList.add("portfolio-filter")
// link de ma div après l'élément h2
sectionEtTitreElement.insertAdjacentElement("afterend", divElementFilterBtn)

// création de mon bouton filtre tous 
const filterAllButton = document.createElement("button")
filterAllButton.classList.add("filter-btn" , "not-clicked")
filterAllButton.innerText = "Tous"
filterAllButton.addEventListener("click", () => {
    createWorksElement(dataWorks)
    updateButtonStyles(filterAllButton);
})
divElementFilterBtn.appendChild(filterAllButton)

// generation de mes autres boutons 
dataCategorie.forEach(category => {
    const filterButton = document.createElement("button")
    filterButton.classList.add("filter-btn")
    filterButton.innerText = category.name
    filterButton.addEventListener("click", () => {
        const elementsFiltres = dataWorks.filter(e => e.categoryId === category.id)
        createWorksElement(elementsFiltres)
        updateButtonStyles(filterButton);
    })
    divElementFilterBtn.appendChild(filterButton)
});

updateButtonStyles(filterAllButton);


// *******************************************************************