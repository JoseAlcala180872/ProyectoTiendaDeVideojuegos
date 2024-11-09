export class GameDetailsHeader extends HTMLElement {
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
        <div class="game-header">
            <img src="https://imgs.search.brave.com/ecv80OvmvzaZyBdoFeSx5Jo_GPSx8hWpgohITvany6c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9sbHl3b29kcmVw/b3J0ZXIuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzEw/LzU3NjlfRDAzMF8w/MDIyNl9SLmpwZz93/PTEyOTYmaD03MzAm/Y3JvcD0x" alt="Game Cover" class="game-cover">
            <div class="game-info">
                <span class="genre">Terror</span>
                <h1 class="title">Five Nights at Freddy's: Security Breach</h1>
                <div class="rating">★★★★☆</div>
                <p class="description">En Five Nights at Freddy's: Security Breach, jugarás como Gregory, un joven que queda atrapado toda la noche en el Mega Pizzaplex de Freddy Fazbear. Con ayuda del mejorado Freddy, Gregory deberá revelar los secretos del Pizzaplex, descubrir la verdad y sobrevivir hasta el amanecer.</p>
                <div class="price">$ 335.99 <span style="font-size: 14px; opacity: 0.7">$ 367.99</span></div>
                <div class="actions">
                    <button class="main-button">🛒 Agregar al carrito</button>
                    <button class="icon-button">❤️</button>
                    <button class="icon-button">⭐</button>
                </div>
            </div>
        </div>
    `;
    }

    #agregarEstilos(shadow) {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/view/components/GameDetailsHeader/GameDetailsHeader.css');
        shadow.appendChild(link);
    }

}