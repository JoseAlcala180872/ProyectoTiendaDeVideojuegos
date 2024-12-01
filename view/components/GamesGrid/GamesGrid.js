export class GamesGrid extends HTMLElement {
    constructor() {
        super();
        this.games = [];
    }

    static get observedAttributes() {
        return ['cat-id', 'is-profile'];
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        await this.#fetchGames();
        this.#addStyles(shadow);
        this.#render(shadow);
    }

    async #fetchGames() {
        try {
            const categoryId = this.getAttribute('cat-id');
            const isProfile = this.getAttribute('is-profile');
            const userData = JSON.parse(localStorage.getItem('userData'));
            console.log('userdata: ', userData.usuario, isProfile)
            const userId = userData.usuario.id;

            const [gamesResponse, matchResponse, purchasesResponse] = await Promise.all([
                fetch('/api/juegos'),
                fetch('/api/categorias/match'),
                userId ? fetch('/api/compras') : Promise.resolve(null)
            ]);

            let [juegos, matches] = await Promise.all([
                gamesResponse.json(),
                matchResponse.json()
            ]);

            console.log('Data fetched:', { juegos, matches, categoryId });

            if (categoryId) {
                const gameIdsForCategory = matches
                    .filter(match => match.categoriaId.toString() === categoryId.toString())
                    .map(match => match.juegoId.toString());

                console.log('Game IDs for category:', gameIdsForCategory);

                this.games = juegos.filter(juego =>
                    gameIdsForCategory.includes(juego.id.toString())
                );

                console.log('Filtered games:', this.games);
                return;
            }
            console.log('validation: ', isProfile && purchasesResponse)
            if (isProfile && purchasesResponse) {
                const purchases = await purchasesResponse.json();
                const userPurchases = purchases.filter(purchase => {
                    console.log('purchase before filtering: ', purchase)
                    return purchase.Usuario?.id.toString() === userId.toString()
                });
                console.log('filtered purcharse: ', userPurchases)

                const userGameIds = new Set();
                userPurchases.forEach(purchase => {
                    purchase.Juegos?.forEach(juego => {
                        userGameIds.add(juego.id.toString());
                    });
                });
                console.log('dataaaa: ', userGameIds, juegos, userPurchases, purchases)
                juegos = juegos.filter(juego =>
                    userGameIds.has(juego.id.toString())
                );
            }

            this.games = juegos;
            console.log('gamess: ', this.games)
        } catch (error) {
            console.error('Error fetching games:', error);
            this.games = [];
        }
    }

    #addStyles(shadow) {
        const style = document.createElement('style');
        style.textContent = `
            .games-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
                padding: 20px 0;
            }

            .error-message {
                color: var(--text-color);
                text-align: center;
                padding: 20px;
            }

            @media (max-width: 768px) {
                .games-grid {
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                }
            }
        `;
        shadow.appendChild(style);
    }

    #render(shadow) {

        while (shadow.firstChild) {
            shadow.removeChild(shadow.firstChild);
        }

        this.#addStyles(shadow);

        if (!this.games.length) {
            shadow.innerHTML += `
                <div class="error-message">
                    No hay juegos por el momento.
                </div>
            `;
            return;
        }

        const gamesGrid = document.createElement('div');
        gamesGrid.className = 'games-grid';

        this.games.forEach(game => {
            const gameCard = document.createElement('game-card');
            gameCard.setAttribute('id', game.id);
            gameCard.setAttribute('title', game.titulo);
            gameCard.setAttribute('price', `$${game.precio}`);
            gameCard.setAttribute('img', game.imagenUrl[0]);
            gameCard.setAttribute('tags', game.desarrollador);
            gamesGrid.appendChild(gameCard);
        });

        shadow.appendChild(gamesGrid);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.#fetchGames().then(() => {
                const shadow = this.shadowRoot;
                this.#render(shadow);
            });
        }
    }
}