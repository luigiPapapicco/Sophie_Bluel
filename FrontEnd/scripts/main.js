import { renderVisitorMode } from "./visitor-structure.js";
import { renderAdminMode } from "./admin-structure.js";

// Vérifie si un token est stocké dans le sessionStorage
function isTokenPresent() {
    // Retourne true si le 'authToken' est présent dans sessionStorage, sinon retourne false
    return sessionStorage.getItem('authToken') !== null;
}

// Active le mode admin ou visiteur en fonction de la présence du token
// Si le token est présent
if (isTokenPresent()) {
    // Active le mode admin
    renderAdminMode();
    // Affiche "mode admin" dans la console
    console.log("mode admin");
    // Sinon
} else {
    // Active le mode visiteur
    renderVisitorMode();
    // Affiche "mode visiteur" dans la console
    console.log("mode visiteur");
}
