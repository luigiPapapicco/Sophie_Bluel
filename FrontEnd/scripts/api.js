// Fonction pour effectuer un appel GET
export async function getRequest(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

// Fonction pour effectuer un appel POST
export async function postRequest(url, data, token) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Post error:", error);
        return null;
    }
}

// Fonction pour effectuer un appel DELETE
export async function deleteRequest(url, token) {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return true; // Indique que la suppression a réussi

    } catch (error) {
        console.error("Delete error:", error); // Log en cas d'erreur
        return false;
    }
}
