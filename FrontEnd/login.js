document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche le formulaire de soumettre de manière traditionnelle

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            // Stocker le token (par exemple dans le localStorage)
            localStorage.setItem('authToken', token);

            document.getElementById('message').textContent = 'Login successful!';
            // Rediriger l'utilisateur ou mettre à jour l'interface utilisateur
        } else {
            const errorData = await response.json();
            document.getElementById('message').textContent = `Login failed: ${errorData.message}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred during login.';
    }
});