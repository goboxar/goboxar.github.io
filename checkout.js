document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const boxSizeElement = document.getElementById('box-size');
    const totalToPayElement = document.getElementById('total-to-pay');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const boxSize = localStorage.getItem('boxSize') || 'standard';

    boxSizeElement.textContent = boxSize;

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} x${item.quantity}</span> · $${(item.price * item.quantity).toFixed(2)}
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = total.toFixed(2);
        totalToPayElement.textContent = total.toFixed(2);
    }

    renderCartItems();

    document.getElementById('confirm-purchase').addEventListener('click', () => {
        document.getElementById('payment-options').style.display = 'block';
    });

    document.getElementById('copy-alias').addEventListener('click', () => {
        const alias = document.getElementById('alias').textContent;
        navigator.clipboard.writeText(alias);
        alert('Alias copiado al portapapeles');
    });

    document.getElementById('copy-cvu').addEventListener('click', () => {
        const cvu = document.getElementById('cvu').textContent;
        navigator.clipboard.writeText(cvu);
        alert('CVU copiado al portapapeles');
    });

    document.getElementById('pay-now').addEventListener('click', () => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const address = document.getElementById('delivery-address').value;

        let message = "Pedido de productos:\n\n";
        cart.forEach(item => {
            message += `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\nTotal: $${total.toFixed(2)}\n`;
        message += `Tamaño de caja: ${boxSize}\n`;
        message += `Dirección de entrega: ${address}\n\n`;
        message += "Por favor confirmar el pedido.";

        const whatsappUrl = `https://wa.me/+12495034769?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;

        localStorage.removeItem('cart');
        localStorage.removeItem('boxSize');
    });
});
