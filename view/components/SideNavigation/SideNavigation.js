export class SideNav extends HTMLElement {
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
            
        <div class="sidenav-mobile">
            <img class="logo" src="/view/assets/icon.svg"/>
            <a href="#" class="nav-item">👤 </a>
            <a href="#" class="nav-item">📚 </a>
            <a href="#" class="nav-item">🔍 </a>
            <a href="#" class="nav-item">❤️ </a>
            
            <a href="#" class="nav-item">🎮 </a>
            <a href="#" class="nav-item">📖 </a>
            <a href="#" class="nav-item">🎵 </a>
            
        </div>
         <div class="sidenav">
            <img class="logo" src="/view/assets/iconlogo.svg"/>
            <a href="#" class="nav-item">👤 Perfil</a>
            <a href="#" class="nav-item">📚 Biblioteca</a>
            <a href="#" class="nav-item">🔍 Buscar</a>
            <a href="#" class="nav-item">❤️ Favoritos</a>
            
            <div class="section-title">Categoría</div>
            <a href="#" class="nav-item">🎮 Games</a>
            <a href="#" class="nav-item">📖 Educational</a>
            <a href="#" class="nav-item">🎵 Música</a>
            
            <div class="section-title">Tienda</div>
        </div>
    `;
    }

    #agregarEstilos(shadow) {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '/view/components/SideNavigation/SideNavigation.css');
        shadow.appendChild(link);
    }
}