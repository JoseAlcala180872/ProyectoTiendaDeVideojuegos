export class GameRecommendations extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })
        this.#agregarEstilos(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML.innerHTML += `
        
        <div class="recommendations">
            <h2 class="title">Recomendados</h2>
            <div class="games-grid">
                <slot></slot>
            </div>
        </div>
    `;
    }

    #agregarEstilos(shadow) {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/view/components/GameRecommendation/GameRecommendation.css');
        shadow.appendChild(link);
    }

}