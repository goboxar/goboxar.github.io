document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    const cart = [];

    const productsContainer = document.getElementById('products-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartLimit = document.getElementById('cart-limit');
    const boxSizeSelect = document.getElementById('box-size');

    // Carga de productos desde el archivo JSON
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts();
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    // Función para renderizar los productos filtrados
    function renderProducts(category = 'all', price = 'all', searchQuery = '') {
        productsContainer.innerHTML = '';

        const filteredProducts = products.filter(product => {
            const matchesCategory = category === 'all' || product.category === category;
            const matchesPrice = price === 'all' || (
                price === 'low' && product.price < 2 ||
                price === 'medium' && product.price >= 2 && product.price <= 5 ||
                price === 'high' && product.price > 5
            );
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesPrice && matchesSearch;
        });

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button data-id="${product.id}">Añadir al Carrito</button>
            `;
            productsContainer.appendChild(productCard);
        });

        addProductButtons();
    }

    // Agregar event listeners a los botones de añadir al carrito
    function addProductButtons() {
        document.querySelectorAll('.product-card button').forEach(button => {
            button.addEventListener('click', event => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) addToCart(product);
            });
        });
    }

    // Función para añadir productos al carrito
    function addToCart(product) {
        const maxItems = parseInt(cartLimit.textContent);
        const currentCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (currentCount >= maxItems) {
            alert('Has alcanzado el límite de productos en la caja.');
            return;
        }

        const existingProduct = cart.find(p => p.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    // Actualizar la visualización del carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                <button data-id="${item.id}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);

        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = itemCount;

        addCartItemButtons();
    }

    // Agregar event listeners a los botones de eliminar productos del carrito
    function addCartItemButtons() {
        document.querySelectorAll('#cart-items button').forEach(button => {
            button.addEventListener('click', event => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }

    // Función para eliminar productos del carrito
    function removeFromCart(productId) {
        const productIndex = cart.findIndex(p => p.id === productId);
        if (productIndex >= 0) {
            cart[productIndex].quantity--;
            if (cart[productIndex].quantity <= 0) cart.splice(productIndex, 1);
            updateCart();
        }
    }

    // Función para filtrar productos según los criterios seleccionados
    function filterProducts() {
        const category = document.getElementById('category')?.value || 'all';
        const price = document.getElementById('price')?.value || 'all';
        const searchQuery = document.getElementById('search')?.value || '';
        renderProducts(category, price, searchQuery);
    }

    // Configuración de los filtros por categoría, precio y búsqueda
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            renderProducts(category);
        });
    });

    boxSizeSelect.addEventListener('change', () => {
        const selectedOption = boxSizeSelect.value;
        cartLimit.textContent = selectedOption === 'little' ? '5' : selectedOption === 'standard' ? '10' : '15';
        updateCart();
    });

    document.getElementById('search')?.addEventListener('input', filterProducts);
    document.getElementById('category')?.addEventListener('change', filterProducts);
    document.getElementById('price')?.addEventListener('change', filterProducts);

    // Manejo del botón de checkout
    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length > 0) {
            const boxSize = boxSizeSelect.value;
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('boxSize', boxSize);
            window.location.href = 'checkout.html';
        } else {
            alert('Tu carrito está vacío.');
        }
    });
});
