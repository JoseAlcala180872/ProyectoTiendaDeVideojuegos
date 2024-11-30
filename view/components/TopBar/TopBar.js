export class TopBar extends HTMLElement {
  constructor() {
    super();
    this.cartItemCount = 0;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    this.#render(shadow);
    this.#updateCartCount();
    this.#setupEventListeners();
    this.#setupCartListener();
    this.#agregarEstilos(shadow);
    this.#updateProfilePic();
  }

  #setupEventListeners() {
    this.#setupCartListener();

    // Listen for authentication events
    window.addEventListener('userAuthenticated', () => {
      this.#updateProfilePic();
    });

    // Handle profile click
    this.shadowRoot.querySelector('.profile-link').addEventListener('click', (e) => {
      if (!this.#checkAuthentication()) {
        e.preventDefault();
        this.#showAuthPopup();
      }
    });

    // Handle cart click
    this.shadowRoot.querySelector('.cart-link').addEventListener('click', (e) => {
      if (!this.#checkAuthentication()) {
        e.preventDefault();
        this.#showAuthPopup();
      }
    });
  }

  #checkAuthentication() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  #showAuthPopup() {
    const authPopup = document.createElement('auth-popup');
    document.body.appendChild(authPopup);
  }

  #updateProfilePic() {
    const userData = localStorage.getItem('userData');
    const profilePic = this.shadowRoot.querySelector('.profile-pic');

    if (userData) {
      profilePic.src = '/assets/pfp.png';
    } else {
      profilePic.src = '/assets/avatar-placeholder.png';
    }
  }

  #setupCartListener() {
    // Listen for custom cartUpdated event
    window.addEventListener('cartUpdated', (e) => {
      this.cartItemCount = e.detail.cartItems.length;
      this.#updateCartBubble();
    });

    // Keep the storage event listener for cross-tab synchronization
    window.addEventListener('storage', (e) => {
      if (e.key === 'cart') {
        this.#updateCartCount();
      }
    });

    // Update on focus
    window.addEventListener('focus', () => {
      this.#updateCartCount();
    });

    // Initial load
    document.addEventListener('DOMContentLoaded', () => {
      this.#updateCartCount();
    });
  }

  #updateCartCount() {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cartItemCount = cart.length;
      this.#updateCartBubble();
    } catch (error) {
      console.error('Error updating cart count:', error);
      this.cartItemCount = 0;
    }
  }

  #updateCartBubble() {
    const cartBubble = this.shadowRoot.querySelector('.cart-bubble');
    if (cartBubble) {
      cartBubble.textContent = this.cartItemCount;
      cartBubble.style.display = this.cartItemCount > 0 ? 'flex' : 'none';

      // Add pop animation when count changes
      cartBubble.classList.remove('pop');
      void cartBubble.offsetWidth; // Force reflow
      cartBubble.classList.add('pop');
    }
  }

  #render(shadow) {
    shadow.innerHTML = `
      <div class="topbar">
        <div class="search-container">
          <input type="text" class="search-input" placeholder="Buscar...">
        </div>
        <div class="icons">
          <a href="/cart" class="cart-link">
            <div class="cart-container">
              <span class="cart-icon">🛒</span>
              <span class="cart-bubble">0</span>
            </div>
          </a>    
          <a href="/profile" class="profile-link">
            <img src="/assets/avatar-placeholder.png" alt="Profile" class="profile-pic">
          </a>
        </div>
      </div>
    `;
  }

  #agregarEstilos(shadow) {
    const style = document.createElement("style");
    style.textContent = `
          .topbar {
              display: flex;
              align-items: center;
              padding: 15px 20px;
              background-color: var(--secondary-color);
              gap: 24px;
          }
          
          .search-container {
              flex: 1;
              margin-right: 20px;
          }

          .search-input {
              width: 100%;
              padding: 8px 15px;
              border: none;
              border-radius: 20px;
              color: var(--text-color);
          }

          .icons {
              display: flex;
              gap: 20px;
              align-items: center;
          }

          .profile-pic {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              background-color: #ddd;
          }

          .cart-link {
              text-decoration: none;
          }

          .cart-container {
              position: relative;
              display: inline-block;
          }

          .cart-icon {
              font-size: 24px;
              cursor: pointer;
          }

          .cart-bubble {
              position: absolute;
              top: -8px;
              right: -8px;
              background-color: #ff4444;
              color: white;
              border-radius: 50%;
              width: 20px;
              height: 20px;
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .cart-bubble.pop {
              animation: popAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          @keyframes popAnimation {
              0% {
                  transform: scale(0.8);
              }
              50% {
                  transform: scale(1.2);
              }
              100% {
                  transform: scale(1);
              }
          }

          .cart-container:hover .cart-icon {
              transform: scale(1.1);
              transition: transform 0.2s ease;
          }

          .cart-container:hover .cart-bubble {
              transform: scale(1.1);
              transition: transform 0.2s ease;
          }
      `;
    shadow.appendChild(style);
  }
}
