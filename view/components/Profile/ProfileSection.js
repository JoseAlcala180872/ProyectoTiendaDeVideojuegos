export class ProfileSection extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.#render();
        this.#setupEventListeners();
    }

    #setupEventListeners() {
        // Update profile when authentication state changes
        window.addEventListener('userAuthenticated', (e) => {
            this.#updateProfile();
        });
    }

    #updateProfile() {
        const userData = JSON.parse(localStorage.getItem('usuario'));
        console.log('userdata: ', userData)
        if (userData && userData.nombre) {
            const usernameElement = this.querySelector('.profile-details h2');
            if (usernameElement) {
                usernameElement.textContent = userData.nombre;
            }
        }
    }

    async #render() {
        const gamesCount = await this.getTotalGamesCount();

        this.innerHTML = `
            <header class="profile-header">
                <div class="profile-banner"></div>
                <div class="profile-info">
                    <img src="/assets/pfp.png" alt="Profile Avatar" class="profile-avatar">
                    <div class="profile-details">
                        <h2>${await this.getCurrentUsername()}</h2>
                        <p class="status">Conectado</p>
                        <div class="stats">
                            <div class="stat">
                                <span class="stat-value">${gamesCount}</span>
                                <span class="stat-label">Juegos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    getCurrentUsername() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        return userData?.usuario?.nombre || 'Usuario';
    }

    async getTotalGamesCount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const res = await (await fetch('/api/compras')).json();
        let count = 0;
        for (let item of res) {
            console.log('iteracion: ', item, userData.usuario)
            if (item.Usuario.id === userData.usuario.id) {
                count++;
            }
        }
        console.log('count: ', count)
        return count;
    }
}
