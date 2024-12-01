class ShoppingCart {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        this.loadCart();
        this.renderCart();
        this.setupEventListeners();
    }

    loadCart() {
        try {
            this.items = JSON.parse(localStorage.getItem('cart')) || [];
        } catch (error) {
            console.error('Error loading cart:', error);
            this.items = [];
        }
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + parseFloat(item.precio), 0);
    }

    updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { cartItems: this.items }
        }));
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateLocalStorage();
        this.renderCart();
    }

    clearCart() {
        this.items = [];
        this.updateLocalStorage();
        this.renderCart();
    }

    async checkout() {
        try {
            const usuarioId = JSON.parse(localStorage.getItem('userData'));
            if (!usuarioId) {
                alert('Por favor inicia sesión para continuar con la compra');
                window.location.href = '/login';
                return;
            }
            console.log('us', usuarioId)

            for (const item of this.items) {
                console.log('item: ', item.id)
                const compraData = {
                    usuarioId: parseInt(usuarioId.usuario.id),
                    juegoId: `${item.id}`,
                    precio_compra: parseFloat(item.precio)
                };
                console.log('compradata: ', compraData)
                const response = await fetch('/api/compras/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${usuarioId.key}`
                    },
                    body: JSON.stringify(compraData)
                });

                if (!response.ok) {
                    throw new Error(`Error al procesar la compra: ${response.statusText}`);
                }
            }
            if (!document.querySelector('#auth-alert-styles')) {
                const alertStyles = document.createElement('style');
                alertStyles.id = 'auth-alert-styles';
                alertStyles.textContent = `
                  .success-alert {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 2rem;
                    background-color: #4CAF50;
                    color: white;
                    border-radius: 4px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    z-index: 1001;
                    transform: translateX(120%);
                    transition: transform 0.3s ease-out;
                  }
          
                  .success-alert.show {
                    transform: translateX(0);
                  }
                `;
                document.head.appendChild(alertStyles);
            }

            // Show success popup
            this.#showSuccessAlert('Iniciado sesión con éxito');

            // Clear the cart after successful purchase
            this.clearCart();

            // Redirect to profile page
            window.location.href = '/profile';

        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Hubo un error al procesar tu compra. Por favor intenta de nuevo.');
        }
    }

    #showSuccessAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'success-alert';
        alert.textContent = message;

        document.body.appendChild(alert);

        setTimeout(() => alert.classList.add('show'), 100);

        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 300);
        }, 2000);
    }

    setupEventListeners() {
        // Remove any existing event listeners first
        const checkoutButton = document.querySelector('.checkout-button');
        if (checkoutButton) {
            // Clone and replace the button to remove all event listeners
            const newButton = checkoutButton.cloneNode(true);
            checkoutButton.parentNode.replaceChild(newButton, checkoutButton);

            // Add the event listener with the stopPropagation
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.checkout();
            }, { once: true }); // This ensures the listener only fires once
        }

        // Do the same for clear cart button
        const clearCartButton = document.getElementById('clearCart');
        if (clearCartButton) {
            const newClearButton = clearCartButton.cloneNode(true);
            clearCartButton.parentNode.replaceChild(newClearButton, clearCartButton);

            newClearButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                    this.clearCart();
                }
            });
        }
    }

    renderCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const checkoutContainer = document.getElementById('checkout');

        if (!cartItemsContainer || !checkoutContainer) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    Tu carrito está vacío
                </div>
            `;
            checkoutContainer.style.display = 'none';
            return;
        }

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.imagenUrl[0]}" alt="${item.titulo}">
                <div class="cart-item-info">
                    <h3>${item.titulo}</h3>
                    <div class="cart-item-price">$${item.precio}</div>
                </div>
                <button class="delete-item" onclick="cart.removeItem(${item.id})">
                    ×
                </button>
            </div>
        `).join('');

        checkoutContainer.style.display = 'block';
        const total = this.calculateTotal();
        checkoutContainer.querySelector('.checkout-total').textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Initialize cart and make it globally available
window.cart = new ShoppingCart();

// Add to script.js
export { ShoppingCart };