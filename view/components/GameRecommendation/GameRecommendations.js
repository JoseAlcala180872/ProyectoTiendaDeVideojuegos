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
        
        <div class="recommendations" >
            <h2 class="title">Recomendados</h2>
            <div class="games-grid">
                <slot></slot>
            </div>
        </div>
    `;
    }

    #agregarEstilos(shadow) {
        const style = document.createElement("style");
        style.textContent = `
        .recommendations {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .recommendation {
    padding: 15px;
  }

  .title {
    font-size: 20px;
  }
}

        `;
        shadow.appendChild(style);
    }

}