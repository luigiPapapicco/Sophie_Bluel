function userMessage(msg) {
    // Récupération de mon élément pour attacher mon message d'erreur
    const sectionLoginTitle = document.querySelector("#login h2");

    // Vérification de l'existence d'un élément de message d'erreur
    let messageErreur = document.querySelector(".error-msg");

    if (!messageErreur) {
        // Création du paragraphe seulement s'il n'existe pas déjà
        messageErreur = document.createElement("p");
        messageErreur.classList.add("error-msg");
        // Ajout du message après le titre
        sectionLoginTitle.insertAdjacentElement("afterend", messageErreur);
    }
    // Mise à jour du texte du message d'erreur
    messageErreur.innerText = msg;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire
    
    // récupération des données saisie par l'utilisateur 
    const datas = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    }
    console.log(datas)

    // création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(datas)
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
    .then(response => {
        // Vérifiez si la réponse est correcte (statut HTTP 200-299)
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json(); // Parse la réponse JSON
    })
    .then(data => {
        // Traitez les données de la réponse
        console.log('Réponse du serveur:', data);
        // enregistrement du token dans le session storage
        const token = data.token
        sessionStorage.setItem("authToken", token)
        // rediriger l'utilsateur une fois la connexion etablie
        window.location.href = "../index.html"

    })
    .catch(error => {
        // Gérez les erreurs
        console.error('Erreur lors de la requête:', error);
        // Afficher un message d'erreur à l'utilisateur
        userMessage("E-mail ou mot de passe incorrectes")

    });

})
