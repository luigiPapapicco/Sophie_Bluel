import { renderVisitorMode } from "./visitor-structure.js";
import { renderAdminMode } from "./admin-structure.js";

// Vérifie si un token est stocké dans le sessionStorage
function isTokenPresent() {
    return sessionStorage.getItem('authToken') !== null;
}

// Active le mode admin ou visiteur en fonction de la présence du token
if (isTokenPresent()) {
    renderAdminMode();
    console.log("mode admin");
} else {
    renderVisitorMode();
    console.log("mode visiteur");
}
