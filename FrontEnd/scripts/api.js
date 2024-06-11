// Fonction pour effectuer un appel GET
export async function getRequest(url) {
    // Essaie d'exécuter le bloc de code suivant et attrape les erreurs s'il y en a
    try {
        // Envoie une requête GET à l'URL spécifiée
        const response = await fetch(url);
        // Vérifie si la réponse n'est pas correcte (statut HTTP non OK)
        if (!response.ok) {
            // Lève une erreur avec le statut HTTP de la réponse
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Retourne les données JSON de la réponse
        return await response.json();
    // Capture les erreurs si elles se produisent dans le bloc try
    } catch (error) {
        // Affiche une erreur dans la console en cas de problème avec la requête fetch
        console.error("Fetch error:", error);
        // Retourne null pour indiquer que la requête a échoué
        return null;
    }
}

// Fonction pour effectuer un appel POST
export async function postRequest(url, data, token) {
    // Essaie d'exécuter le bloc de code suivant et attrape les erreurs s'il y en a
    try {
        // Envoie une requête POST à l'URL spécifiée avec les options données
        const response = await fetch(url, {
            // Spécifie la méthode de la requête comme étant POST (le verbe)
            method: "POST",
            // Définit les en-têtes de la requête
            headers: {
                // Indique que le contenu envoyé est en format JSON
                "Content-Type": "application/json",
                // Ajoute un en-tête d'autorisation avec le jeton fourni
                "Authorization": `Bearer ${token}`
            },
            // Convertit les données en chaîne JSON pour les envoyer dans le corps de la requête
            body: JSON.stringify(data)
        });
        // Vérifie si la réponse n'est pas correcte (statut HTTP non OK)
        if (!response.ok) {
            // Lève une erreur avec le statut HTTP de la réponse
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Retourne les données JSON de la réponse
        return await response.json();
    // Capture les erreurs si elles se produisent dans le bloc try
    } catch (error) {
        // Affiche une erreur dans la console en cas de problème avec la requête POST
        console.error("Post error:", error);
        // Retourne null pour indiquer que la requête a échoué
        return null;
    }
}

// Fonction pour effectuer un appel DELETE
export async function deleteRequest(url, token) {
    // Essaie d'exécuter le bloc de code suivant et attrape les erreurs s'il y en a
    try {
        // Envoie une requête DELETE à l'URL spécifiée avec les options données 
        const response = await fetch(url, {
            // Spécifie la méthode de la requête comme étant DELETE (verbe)
            method: "DELETE",
            // Définit les en-têtes de la requête
            headers: {
                // Ajoute un en-tête d'autorisation avec le jeton fourni
                "Authorization": `Bearer ${token}`
            }
        });
        // Vérifie si la réponse n'est pas correcte (statut HTTP non OK)
        if (!response.ok) {
            // Lève une erreur avec le statut HTTP de la réponse
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
         // Retourne true pour indiquer que la suppression a réussi
        return true; // Indique que la suppression a réussi
    // Capture les erreurs si elles se produisent dans le bloc try
    } catch (error) {
        // Affiche une erreur dans la console en cas de problème avec la requête DELETE
        console.error("Delete error:", error); // Log en cas d'erreur
        // Retourne false pour indiquer que la requête a échoué
        return false;
    }
}
