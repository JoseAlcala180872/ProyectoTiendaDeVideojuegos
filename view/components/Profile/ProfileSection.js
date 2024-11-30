export class ProfileSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.#render();
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

    #render() {
        this.innerHTML = `
            <header class="profile-header">
                <div class="profile-banner"></div>
                <div class="profile-info">
                    <img src="/assets/pfp.png" alt="Profile Avatar" class="profile-avatar">
                    <div class="profile-details">
                        <h2>${this.getCurrentUsername()}</h2>
                        <p class="status">Conectado</p>
                        <div class="stats">
                            <div class="stat">
                                <span class="stat-value">0</span>
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
}
