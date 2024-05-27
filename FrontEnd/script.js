// ************************************************************************** //
// récupération des travaux de l'artiste via l'api

// récupération de la collection works via l'api
const worksReponse = await fetch("http://localhost:5678/api/works");
const works = await worksReponse.json();

function genererWorks(works) {
    // nettoyage de la section gallery avant de générer les nouveaux éléments
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = '';

    // boucle d'itération sur ma collection works
    for (let i = 0; i < works.length; i++) {
        // récupération à chaque itération d'une ressource
        const work = works[i];
        // création de la balise qui va accueillir nos éléments img & figcaption
        const figureElement = document.createElement("figure");
        // création de la balise img | indication du path de l'image via l'api
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        // création de la balise figcaption | et récupération du texte
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = work.title;
        // attache des balises 
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        sectionGallery.appendChild(figureElement);
    }
}

// premier affichage de ma page
genererWorks(works);

// ************************************************************************** //
// mise en place des filtres

// récupération de la collection categories via l'api
const categoriesReponse = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesReponse.json();

// ajout de la checkbox "Tout"
const sectionFilter = document.querySelector(".filters");
const labelAllElement = document.createElement("label");
const inputAllElement = document.createElement("input");
inputAllElement.type = "checkbox";
inputAllElement.name = "Tout";
inputAllElement.value = "all";
inputAllElement.checked = true; // activé par défaut
labelAllElement.appendChild(inputAllElement);
labelAllElement.appendChild(document.createTextNode("Tout"));
sectionFilter.appendChild(labelAllElement);

// fonction pour mettre à jour le style des checkboxes
function updateCheckboxStyle() {
    document.querySelectorAll(".filters input[type='checkbox']").forEach(checkbox => {
        const label = checkbox.parentElement;
        if (checkbox.checked) {
            label.classList.add("checkbox-active");
            label.classList.remove("checkbox-inactive");
        } else {
            label.classList.add("checkbox-inactive");
            label.classList.remove("checkbox-active");
        }
    });
}

// fonction pour vérifier l'état des checkboxes et gérer l'activation de "Tout"
function checkAndToggleAllCheckbox() {
    const objetsCheckbox = document.querySelector("input[name='Objets']");
    const appartementsCheckbox = document.querySelector("input[name='Appartements']");
    const hotelsCheckbox = document.querySelector("input[name='Hotels & restaurants']");

    if (objetsCheckbox.checked && appartementsCheckbox.checked && hotelsCheckbox.checked) {
        objetsCheckbox.checked = false;
        appartementsCheckbox.checked = false;
        hotelsCheckbox.checked = false;
        inputAllElement.checked = true;
        genererWorks(works);
    }
    updateCheckboxStyle();
}

// initialisation du style des checkboxes
updateCheckboxStyle();

// gestion de l'événement pour la checkbox "Tout"
inputAllElement.addEventListener("change", () => {
    if (inputAllElement.checked) {
        document.querySelectorAll(".filters input[type='checkbox']").forEach(checkbox => {
            if (checkbox !== inputAllElement) {
                checkbox.checked = false;
            }
        });
        genererWorks(works);
    }
    updateCheckboxStyle();
});

// boucle d'itération sur ma collection categories
for (let i = 0; i < categories.length; i++) {
    // récupération à chaque itération d'une ressource
    const categorie = categories[i];
    // création de la balise label qui accueillera mon input
    const labelElement = document.createElement("label");
    // création de la balise input
    const inputElement = document.createElement("input");
    inputElement.type = "checkbox"; // spécifie le type checkbox
    inputElement.name = categorie.name;  // ajoute un nom 
    inputElement.value = categorie.id; // ajoute un id 
    // attache des balises
    labelElement.appendChild(inputElement);
    labelElement.appendChild(document.createTextNode(categorie.name));
    sectionFilter.appendChild(labelElement);

    // ajout de l'événement change à chaque checkbox
    inputElement.addEventListener("change", () => {
        const checkedFilters = Array.from(document.querySelectorAll(".filters input:checked"))
            .map(input => input.name)
            .filter(name => name !== "Tout");

        // décocher la checkbox "Tout" si une autre checkbox est cochée
        if (checkedFilters.length > 0) {
            inputAllElement.checked = false;
        } else {
            inputAllElement.checked = true;
        }

        const filteredWorks = works.filter(work =>
            checkedFilters.includes(work.category.name)
        );

        // mise à jour de la galerie avec les travaux filtrés ou tous les travaux
        genererWorks(filteredWorks.length > 0 ? filteredWorks : works);
        checkAndToggleAllCheckbox(); // Vérifier l'état des trois filtres
    });
}

// mettre à jour le style des checkbox après l'ajout de toutes les checkbox de catégories
updateCheckboxStyle();

