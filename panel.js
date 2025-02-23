document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Debes iniciar sesión primero.');
        window.location.href = '/login.html';
    }

    // Verificar el token antes de cargar el panel
    fetch('/panel-franquiciado', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Mostrar la información del kiosco
        document.getElementById('kiosco-nombre').textContent = data.kiosco.nombre;
        document.getElementById('kiosco-ubicacion').textContent = data.kiosco.ubicacion;
        // Cargar los productos y pedidos del franquiciado
        displayProducts(data.products);
        displayOrders(data.orders);
    })
    .catch(error => {
        console.error('Error al cargar los datos del panel:', error);
        alert('Hubo un error, intenta nuevamente.');
    });

    // Función para cargar productos
    function displayProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Limpiar la lista
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.price}`;
            productList.appendChild(li);
        });
    }

    // Función para cargar pedidos
    function displayOrders(orders) {
        const ordersTableBody = document.querySelector('#orders-table tbody');
        ordersTableBody.innerHTML = ''; // Limpiar la tabla
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.status}</td>
                <td><button class="view-order">Ver</button></td>
            `;
            ordersTableBody.appendChild(row);
        });
    }
});

// Cerrar sesión
document.getElementById('logout').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('token'); // Eliminar token
        window.location.href = '/login.html'; // Redirigir al login
    }
});
