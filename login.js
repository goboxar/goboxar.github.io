document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Obtener los datos del formulario
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Validación simple del formulario
    if (email === "" || password === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    // Aquí puedes hacer la llamada al backend (por ejemplo, a tu servidor en Heroku)
    // usando fetch() o cualquier otra librería para enviar los datos al backend.
    fetch("https://tuservidor.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Si el login fue exitoso, redirigir al usuario
          window.location.href = "/dashboard.html"; // O la página de franquiciados o donde quieras
        } else {
          alert("Credenciales incorrectas. Intenta nuevamente.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Hubo un error al intentar iniciar sesión. Intenta de nuevo.");
      });
  });
  