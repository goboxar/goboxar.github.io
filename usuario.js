// Usuario.js - Funcionalidad Mejorada

// Cambiar contraseña
document.getElementById('change-password').addEventListener('click', function() {
    let newPassword = prompt('Ingresa tu nueva contraseña:');
    if (newPassword) {
        alert('Contraseña actualizada exitosamente.');
    } else {
        alert('No se ingresó ninguna contraseña.');
    }
});

// Cerrar sesión
document.getElementById('logout').addEventListener('click', function() {
    let confirmLogout = confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmLogout) {
        alert('Cerrando sesión...');
    }
});

// Actualizar Información del Usuario
function updateUserInfo() {
    let name = document.getElementById('user-name').value;
    let email = document.getElementById('user-email').value;
    let phone = document.getElementById('user-phone').value;

    if (name && email && phone) {
        alert('Tu información ha sido actualizada correctamente.');
    } else {
        alert('Por favor, completa todos los campos antes de actualizar.');
    }
}

document.getElementById('update-info').addEventListener('click', updateUserInfo);

// Ver detalles del pedido
document.querySelectorAll('.order-item button').forEach(button => {
    button.addEventListener('click', function() {
        let orderId = this.parentElement.querySelector('p').textContent.split(' ')[1];
        alert(`Mostrando detalles para el Pedido #${orderId}`);
    });
});

// Mostrar notificaciones
function showNotification(message) {
    let notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

window.addEventListener('load', () => {
    showNotification('¡Bienvenido de nuevo, Fernando!');
});

// Cambiar foto de perfil
document.getElementById('change-profile-pic').addEventListener('click', function() {
    let newPic = prompt('Ingresa la URL de tu nueva foto de perfil:');
    if (newPic) {
        document.getElementById('profile-pic').src = newPic;
        alert('Foto de perfil actualizada.');
    } else {
        alert('No se proporcionó una nueva foto.');
    }
});

// Mostrar historial de compras
document.getElementById('view-history').addEventListener('click', function() {
    alert('Mostrando historial de compras...');
    // Aquí puedes redirigir al usuario a una página con su historial de compras.
});

// Cambiar preferencias de notificación
document.getElementById('change-notifications').addEventListener('click', function() {
    let newPreference = prompt('¿Quieres recibir notificaciones por correo electrónico? (Sí/No)');
    if (newPreference.toLowerCase() === 'sí') {
        alert('Notificaciones activadas por correo electrónico.');
    } else {
        alert('Notificaciones desactivadas.');
    }
});
