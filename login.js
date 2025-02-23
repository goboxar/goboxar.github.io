document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('token', data.token); // Guardar el token
            window.location.href = '/panel-franquiciado.html';
        } else {
            alert('Credenciales incorrectas.');
        }
    })
    .catch(error => {
        console.error('Error al intentar iniciar sesión:', error);
        alert('Hubo un error, intenta nuevamente.');
    });
});
