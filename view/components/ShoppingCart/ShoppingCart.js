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
        // Dispatch custom event for cart update
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

    setupEventListeners() {
        document.getElementById('clearCart')?.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                this.clearCart();
            }
        });
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