export class GamesGrid extends HTMLElement {
    constructor() {
        super();
        this.games = [];
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        await this.#fetchGames();
        this.#addStyles(shadow);
        this.#render(shadow);
    }

    async #fetchGames() {
        try {
            const response = await fetch('/api/juegos');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.games = await response.json();
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
            // Assuming the API doesn't provide tags, you might want to handle this differently
            gameCard.setAttribute('tags', game.desarrollador);
            gamesGrid.appendChild(gameCard);
        });

        shadow.appendChild(gamesGrid);
    }
}