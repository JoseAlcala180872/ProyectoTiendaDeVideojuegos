export class GameCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })
        this.#agregarEstilos(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        const title = this.getAttribute('title') || 'Game Title';
        const price = this.getAttribute('price') || 'Free';
        const tags = (this.getAttribute('tags') || 'Action,Adventure').split(',');
        const img = (this.getAttribute('img') || './assets/pfp.png');
        const id = (this.getAttribute('id') || '404');

        shadow.innerHTML += `
        <a href="/game?id=${id}" style="text-decoration: none; color: white">        
          <div class="game-card">
              <img src="${img}" alt="${title}" class="game-image">
              <div class="game-info">
                  <h3 class="game-title">${title}</h3>
                  <div class="tags">
                      ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                  </div>
                  <div class="actions">
                      <button class="price-button">${price}</button>
                      <div class="icons">
                      </div>
                  </div>
              </div>
          </div>
        </a>
    `;
    }

    #agregarEstilos(shadow) {
        const style = document.createElement("style");
        style.textContent = `
                   .game-card {
  background-color: var(--secondary-color);
  border-radius: 10px;
  overflow: hidden;
  width: fit-content;
}

.game-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.game-info {
  padding: 15px;
}

.game-title {
  font-size: 18px;
  margin: 0 0 10px 0;
}

.tags {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.tag {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 12px;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-button {
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.icons {
  display: flex;
  gap: 10px;
}


        `;
        shadow.appendChild(style);
    }


}