export class GameDetailsHeader extends HTMLElement {
  constructor() {
    super();
    this.gameData = null;
  }

  static get observedAttributes() {
    return ['game-id'];
  }

  async connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    await this.#fetchGameData();
    this.#render(shadow);
    this.#agregarEstilos(shadow);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'game-id' && oldValue !== newValue && this.shadowRoot) {
      this.#fetchGameData().then(() => this.#render(this.shadowRoot));
    }
  }

  async #fetchGameData() {
    const gameId = this.getAttribute('game-id');
    if (!gameId) return;

    try {
      const response = await fetch(`/api/juegos/${gameId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.gameData = await response.json();
    } catch (error) {
      console.error('Error fetching game data:', error);
      this.gameData = null;
    }
  }

  #render(shadow) {
    if (!this.gameData) {
      shadow.innerHTML = `
            <div class="game-header">
                <p>Loading game details...</p>
            </div>
        `;
      return;
    }

    const { titulo, descripcion, precio, imagenUrl, desarrollador } = this.gameData;
    const originalPrice = (parseFloat(precio) * 1.1).toFixed(2);

    // Encode game data for the shopping-button attribute
    const encodedGameData = encodeURIComponent(JSON.stringify(this.gameData));

    shadow.innerHTML = `
    <div class="game-header">
        <img src="${imagenUrl[0]}" alt="${titulo}" class="game-cover">
        <div class="game-info">
            <span class="genre">${desarrollador}</span>
            <h1 class="title">${titulo}</h1>
            <div class="rating">★★★★☆</div>
            <p class="description">${descripcion}</p>
            <div class="price">$ ${precio} <span style="font-size: 14px; opacity: 0.7">$ ${originalPrice}</span></div>
            <div class="actions">
                <shopping-button game-data='${encodedGameData}'></shopping-button>
            </div>
        </div>
    </div>
`;
  }

  #agregarEstilos(shadow) {
    const style = document.createElement("style");
    style.textContent = `
          .game-header {
              background-color: var(--turquoise);
              padding: 20px;
              display: flex;
              gap: 20px;
              min-height: 300px;
          }

          .game-cover {
              width: 220px;
              height: 300px;
              border-radius: 10px;
              object-fit: contain;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .game-info {
              flex: 1;
              display: flex;
              flex-direction: column;
          }

          .genre {
              display: inline-block;
              background: rgba(0, 0, 0, 0.2);
              padding: 5px 15px;
              border-radius: 15px;
              margin-bottom: 10px;
          }

          .title {
              font-size: 28px;
              margin-bottom: 10px;
          }

          .rating {
              font-size: 24px;
              margin-bottom: 15px;
          }

          .description {
              font-size: 14px;
              line-height: 1.6;
              margin-bottom: 20px;
          }

          .price {
              font-size: 24px;
              margin-bottom: 15px;
          }

          .actions {
              display: flex;
              gap: 15px;
              margin-top: auto;
          }

          .main-button {
              background-color: #2DC48D;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 5px;
          }

          .icon-button {
              background: rgba(0, 0, 0, 0.2);
              border: none;
              width: 40px;
              height: 40px;
              border-radius: 5px;
              color: white;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
          }

          @media (max-width: 768px) {
              .game-header {
                  flex-direction: column;
                  padding: 15px;
              }

              .game-cover {
                  width: 180px;
                  height: 240px;
                  align-self: center;
              }

              .title {
                  font-size: 24px;
              }

              .actions {
                  flex-wrap: wrap;
              }

              .main-button {
                  flex: 1;
              }
          }
      `;
    shadow.appendChild(style);
  }
}