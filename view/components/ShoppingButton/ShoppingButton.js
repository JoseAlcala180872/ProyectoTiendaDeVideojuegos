export class ShoppingButton extends HTMLElement {
    constructor() {
        super();
        this.gameData = null;
    }

    static get observedAttributes() {
        return ['game-data'];
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#render(shadow);
        this.#addStyles(shadow);
        this.#setupEventListeners(shadow);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'game-data' && oldValue !== newValue) {
            try {
                this.gameData = JSON.parse(decodeURIComponent(newValue));
            } catch (e) {
                console.error('Error parsing game data:', e);
                this.gameData = null;
            }
        }
    }

    #setupEventListeners(shadow) {
        const button = shadow.querySelector('.shopping-button');
        button.addEventListener('click', () => this.#handleButtonClick());
    }

    #checkAuthentication() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    #handleButtonClick() {
        const isAuthenticated = this.#checkAuthentication();

        if (!isAuthenticated) {
            // Show auth popup if not logged in
            const authPopup = document.createElement('auth-popup');
            document.body.appendChild(authPopup);

            // Listen for successful authentication to add to cart
            window.addEventListener('userAuthenticated', () => {
                this.#handleAddToCart();
            }, { once: true }); // Remove listener after first use
        } else {
            // User is logged in, proceed with adding to cart
            this.#handleAddToCart();
        }
    }

    #handleAddToCart() {
        if (!this.gameData) return;

        try {
            // Get current cart or initialize empty array
            const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');

            // Check if game is already in cart
            const isInCart = currentCart.some(item => item.id === this.gameData.id);

            if (!isInCart) {
                // Add game to cart
                currentCart.push(this.gameData);
                localStorage.setItem('cart', JSON.stringify(currentCart));

                window.dispatchEvent(new CustomEvent('cartUpdated', {
                    detail: { cartItems: currentCart }
                }));

                // Show success feedback
                this.#showFeedback('¡Agregado al carrito!', 'success');
            } else {
                // Show already in cart feedback
                this.#showFeedback('Este juego ya está en el carrito', 'info');
            }
        } catch (e) {
            console.error('Error managing cart:', e);
            this.#showFeedback('Error al agregar al carrito', 'error');
        }
    }

    #showFeedback(message, type) {
        const feedback = this.shadowRoot.querySelector('.feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        feedback.style.opacity = '1';

        setTimeout(() => {
            feedback.style.opacity = '0';
        }, 2000);
    }

    #render(shadow) {
        shadow.innerHTML = `
            <div class="container">
                <button class="shopping-button">
                    🛒 Agregar al carrito
                </button>
                <div class="feedback"></div>
            </div>
        `;
    }

    #addStyles(shadow) {
        const style = document.createElement('style');
        style.textContent = `
            .container {
                position: relative;
                display: inline-block;
            }

            .shopping-button {
                background-color: #2DC48D;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 16px;
                transition: background-color 0.3s ease;
            }

            .shopping-button:hover {
                background-color: #25A077;
            }

            .shopping-button:active {
                transform: scale(0.98);
            }

            .feedback {
                position: absolute;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
                padding: 8px 16px;
                border-radius: 4px;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s ease;
                white-space: nowrap;
                pointer-events: none;
            }

            .feedback.success {
                background-color: #4CAF50;
                color: white;
            }

            .feedback.error {
                background-color: #f44336;
                color: white;
            }

            .feedback.info {
                background-color: #2196F3;
                color: white;
            }
        `;
        shadow.appendChild(style);
    }
}
