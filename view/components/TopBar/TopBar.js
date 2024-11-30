export class TopBar extends HTMLElement {
  constructor() {
    super();
    this.cartItemCount = 0;
    this.searchTimeout = null;
    this.games = [];
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    this.#render(shadow);
    this.#updateCartCount();
    this.#setupEventListeners();
    this.#agregarEstilos(shadow);
    this.#updateProfilePic();
    this.#fetchInitialGames();
  }

  async #fetchInitialGames() {
    try {
      const response = await fetch('/api/juegos?limit=10');
      if (!response.ok) throw new Error('Failed to fetch games');
      this.games = await response.json();
    } catch (error) {
      console.error('Error fetching games:', error);
      this.games = [];
    }
  }

  #setupEventListeners() {
    this.#setupCartListener();
    this.#setupSearchListeners();

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

    // Close search results when clicking outside
    document.addEventListener('mousedown', (e) => {
      const searchContainer = this.shadowRoot.querySelector('.search-container');
      // Only hide if clicking outside the search container
      if (!searchContainer.contains(e.target)) {
        this.#hideSearchResults();
      }
    });
  }

  #setupSearchListeners() {
    const searchInput = this.shadowRoot.querySelector('.search-input');
    const searchResults = this.shadowRoot.querySelector('.search-results');

    // Show results on focus
    searchInput.addEventListener('focus', () => {
      this.#showInitialResults();
    });

    // Handle clicking on results
    searchResults.addEventListener('mousedown', (e) => {
      const gameItem = e.target.closest('.search-result-item');
      if (gameItem) {
        e.preventDefault(); // Prevent losing focus
        window.location.href = `/game?id=${gameItem.dataset.id}`;
      }
    });

    searchInput.addEventListener('input', (e) => {
      clearTimeout(this.searchTimeout);
      console.log('value: ', e.target.value)
      if (e.target.value.trim() === '') {
        this.#showInitialResults();
        return;
      }

      this.#performSearch(e.target.value);
    });
  }

  async #performSearch(query) {
    try {
      console.log("game: ", this.games)
      const filteredGames = this.games.filter(game =>
        game?.titulo?.toLowerCase().includes(query.toLowerCase())
      );
      console.log('filtered: ', filteredGames)
      this.#updateSearchResults(filteredGames);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  }

  #showInitialResults() {
    const initialGames = this.games.slice(0, 3);
    this.#updateSearchResults(initialGames);
  }

  #updateSearchResults(games) {
    const searchResults = this.shadowRoot.querySelector('.search-results');
    searchResults.innerHTML = games.map(game => `
      <div class="search-result-item" data-id="${game.id}">
        <img src="${game.imagenUrl[0]}" alt="${game.titulo}" class="search-result-image">
        <div class="search-result-info">
          <div class="search-result-title">${game.titulo}</div>
          <div class="search-result-price">$${game.precio}</div>
        </div>
      </div>
    `).join('');

    searchResults.style.display = 'block';
  }

  #hideSearchResults() {
    const searchResults = this.shadowRoot.querySelector('.search-results');
    searchResults.style.display = 'none';
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
          <div class="search-results"></div>
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
        position: relative;
        flex: 1;
        margin-right: 20px;
      }

      .search-input {
        width: 100%;
        padding: 8px 15px;
        border: none;
        border-radius: 20px;
        color: var(--text-color);
        background: var(--primary-color);
      }

      .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--secondary-color);
        border-radius: 8px;
        margin-top: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: none;
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
      }

      .search-result-item {
        display: flex;
        padding: 12px;
        gap: 12px;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .search-result-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .search-result-image {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 4px;
      }

      .search-result-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .search-result-title {
        color: var(--text-color);
        font-size: 14px;
        margin-bottom: 4px;
      }

      .search-result-price {
        color: var(--accent-color);
        font-size: 12px;
        font-weight: bold;
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
