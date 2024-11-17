export class SideNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregarEstilos(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            
        <div class="sidenav-mobile">
            <a href="/">
                <img class="logo" src="/assets/icon.svg"/>
            </a>
            <a href="/profile" class="nav-item">👤 </a>
            <a href="/profile" class="nav-item">📚 </a>
            
            <a href="#" class="nav-item">🎮 </a>
            <a href="#" class="nav-item">📖 </a>
            <a href="#" class="nav-item">🎵 </a>
            
        </div>
         <div class="sidenav">
            <a href="/">
                <img class="logo" src="/assets/iconlogo.svg"/>
            </a>
            <a href="/profile" class="nav-item">👤 Perfil</a>
            <a href="/profile" class="nav-item">📚 Biblioteca</a>
            
            <div class="section-title">Categoría</div>
            <a href="#" class="nav-item">🎮 Arcade</a>
            <a href="#" class="nav-item">📖 Historia</a>
            <a href="#" class="nav-item">🎵 Ritmo</a>
            
        </div>
    `;
    }

    #agregarEstilos(shadow) {
        const style = document.createElement("style");
        style.textContent = `
                    .sidenav {
        width: 200px;
        height: 100vh;
        background-color: #1D3557;
        padding: 20px;
        }

        .logo {
        font-size: 24px;
        margin-bottom: 30px;
        color: var(--text-color);
        }

        .nav-item {
        display: flex;
        align-items: center;
        padding: 10px;
        color: var(--text-color);
        text-decoration: none;
        margin-bottom: 10px;
        }

        .nav-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        }

        .section-title {
        font-size: 14px;
        color: #888;
        margin: 20px 0 10px 0;
        }

        .sidenav-mobile {
        display: none;
        }

        @media (max-width: 768px) {
        .sidenav-mobile {
            width: 50px;
            height: 100%;
            background-color: var(--secondary-color);
            padding: 20px;
            align-items: center;
            display: flex;
            flex-direction: column;
        }
        .sidenav {
            display: none;
        }
        }

        `;
        shadow.appendChild(style);
    }
}
