import { postRequest } from "./api.js";

// Affiche un message d'erreur à l'utilisateur
function showUserMessage(msg) {
    // Sélectionne l'élément <h2> dans l'élément avec l'ID "login"
    const loginTitleElement = document.querySelector("#login h2");
    // Sélectionne l'élément avec la classe "error-msg"
    let errorMessageElement = document.querySelector(".error-msg");

    // Si l'élément avec la classe "error-msg" n'existe pas
    if (!errorMessageElement) {
        // Crée un nouvel élément <p>
        errorMessageElement = document.createElement("p");
        // Ajoute la classe "error-msg" à cet élément <p>
        errorMessageElement.classList.add("error-msg");
        // Insère le nouvel élément <p> juste après l'élément <h2>
        loginTitleElement.insertAdjacentElement("afterend", errorMessageElement);
    }
    // Définit le texte de l'élément "error-msg" à msg
    errorMessageElement.innerText = msg;
}

// Gestionnaire d'événement pour le formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    // Empêche le comportement par défaut de l'envoi du formulaire
    event.preventDefault();
    // Récupère les informations d'identification de l'utilisateur à partir du formulaire
    const credentials = {
        // Récupère la valeur de l'email
        email: event.target.querySelector("[name=email]").value,
        // Récupère la valeur du mot de passe
        password: event.target.querySelector("[name=password]").value,
    };

    // Envoie les informations d'identification à l'API et attend la réponse
    const data = await postRequest("http://localhost:5678/api/users/login", credentials);
    // Si la réponse contient un jeton
    if (data && data.token) {
        // Stocke le jeton dans sessionStorage
        sessionStorage.setItem("authToken", data.token);
        // Redirige l'utilisateur vers la page d'accueil
        window.location.href = "../index.html";
    } else {
        // Sinon affiche un message d'erreur à l'utilisateur
        showUserMessage("E-mail ou mot de passe incorrectes");
    }
});
