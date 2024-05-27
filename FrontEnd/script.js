// récupération de la collection works via l'api
const worksReponse = await fetch("http://localhost:5678/api/works");
const works = await worksReponse.json();

for (let i = 0; i < works.length; i++) {
    
    // récuperation de tout les items contenu dans la liste via l'api
    const work = works[i];

    //  récupération de l'élément du DOM qui acceuillera les items
    const sectionGallery = document.querySelector(".gallery");
  
    // création de la balise qui va acceuillire nos élément img&cfigcaption
    const figureElement = document.createElement("figure");

    // création de la balise img | indication du path de l'image via l'api
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;


    // création de la blise figcaption | et récupération du texte
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = work.title;

    // attache des balises 
    sectionGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
}

// récupération de la collection categories via l'api
const categoriesReponse = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesReponse.json();

// mise en place des filtres
for (let i = 0; i < categories.length; i++) {

    const categorie = categories[i];
    
    console.log(categorie.name);
}