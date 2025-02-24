document.getElementById("register-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Validación simple del formulario
  if (name === "" || email === "" || password === "" || confirmPassword === "") {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden. Intenta nuevamente.");
    return;
  }

  // Aquí puedes hacer la llamada al backend (por ejemplo, a tu servidor en Heroku)
  // usando fetch() o cualquier otra librería para enviar los datos al backend.
  fetch("https://goboxar-5dcd4f7ea0da.herokuapp.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Si el registro fue exitoso, redirigir al usuario
        window.location.href = "/login.html"; // Redirigir a la página de login
      } else {
        alert("Hubo un error al registrarte. Intenta nuevamente.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Hubo un error al intentar registrarte. Intenta de nuevo.");
    });
});
