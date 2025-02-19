document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    const cart = [];
    const boxSizes = {
        little: 5,
        standard: 10,
        big: 15
    };
    let currentBoxSize = boxSizes.little;
    
    const productsContainer = document.getElementById('products');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartLimit = document.getElementById('cart-limit');

    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts();
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    document.getElementById('box-size').addEventListener('change', (event) => {
        currentBoxSize = boxSizes[event.target.value];
        cartLimit.textContent = currentBoxSize;
        updateCart();
    });

    function renderProducts(filterCategory = 'all', filterPrice = 'all', searchQuery = '') {
        productsContainer.innerHTML = '';

        const filteredProducts = products.filter(product => {
            const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
            const matchesPrice = filterPrice === 'all' || (
                filterPrice === 'low' && product.price < 2 ||
                filterPrice === 'medium' && product.price >= 2 && product.price <= 5 ||
                filterPrice === 'high' && product.price > 5
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

    function addProductButtons() {
        const buttons = document.querySelectorAll('.product-card button');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToCart(product);
            });
        });
    }

    function addToCart(product) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems < currentBoxSize) {
            const existingProductIndex = cart.findIndex(p => p.id === product.id);
            if (existingProductIndex >= 0) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
        } else {
            alert('Has alcanzado el límite de items para esta caja.');
        }
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            cartItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="remove-item" data-id="${item.id}">Eliminar</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = totalItems;

        addCartItemButtons();
    }

    function addCartItemButtons() {
        const buttons = document.querySelectorAll('.remove-item');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });

        // Add event listener for checkout button
        document.getElementById('checkout').addEventListener('click', () => {
            localStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en localStorage
            window.location.href = 'checkout.html';
        });
    }

    function removeFromCart(productId) {
        const productIndex = cart.findIndex(p => p.id === productId);
        if (productIndex >= 0) {
            cart[productIndex].quantity -= 1;
            if (cart[productIndex].quantity === 0) {
                cart.splice(productIndex, 1);
            }
            updateCart();
        }
    }
});
