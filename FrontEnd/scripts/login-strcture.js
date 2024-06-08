import { postRequest } from "./api.js";

// Affiche un message d'erreur à l'utilisateur
function showUserMessage(msg) {
    const loginTitleElement = document.querySelector("#login h2");
    let errorMessageElement = document.querySelector(".error-msg");

    if (!errorMessageElement) {
        errorMessageElement = document.createElement("p");
        errorMessageElement.classList.add("error-msg");
        loginTitleElement.insertAdjacentElement("afterend", errorMessageElement);
    }
    errorMessageElement.innerText = msg;
}

// Gestionnaire d'événement pour le formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const credentials = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };

    const data = await postRequest("http://localhost:5678/api/users/login", credentials);
    if (data && data.token) {
        sessionStorage.setItem("authToken", data.token);
        window.location.href = "../index.html";
    } else {
        showUserMessage("E-mail ou mot de passe incorrectes");
    }
});
