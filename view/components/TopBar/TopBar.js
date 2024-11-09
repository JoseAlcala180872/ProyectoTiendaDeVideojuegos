export class TopBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })
        this.#agregarEstilos(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            
        <div class="topbar">
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Buscar...">
            </div>
            <div class="icons">
                <span>🛒</span>
                <span>🔔</span>
                <img src="/view/assets/pfp.png" alt="Profile" class="profile-pic">
            </div>
        </div>
    `;
    }

    #agregarEstilos(shadow) {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/view/components/TopBar/TopBar.css');
        shadow.appendChild(link);
    }

}