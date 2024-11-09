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

        shadow.innerHTML += `
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
                        <span>❤️</span>
                        <span>⭐</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    #agregarEstilos(shadow) {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/view/components/GameCard/GameCard.css');
        shadow.appendChild(link);
    }


}