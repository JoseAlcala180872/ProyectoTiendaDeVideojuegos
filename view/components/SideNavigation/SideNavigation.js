export class SideNav extends HTMLElement {
    constructor() {
        super();
        this.categories = [];
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregarEstilos(shadow);
        await this.#fetchCategories();
        this.#render(shadow);
    }

    async #fetchCategories() {
        try {
            // Fetch category matches first
            const matchResponse = await fetch('/api/categorias/match');
            const matches = await matchResponse.json();

            // Fetch detailed category information for each match
            const categoryPromises = matches.map(match =>
                fetch(`/api/categorias/${match.categoriaId}`)
                    .then(res => res.json())
            );

            // Wait for all category requests to complete
            this.categories = await Promise.all(categoryPromises);
        } catch (error) {
            console.error('Error fetching categories:', error);
            this.categories = []; // Set empty array on error
        }
    }

    #getCategoryEmoji(categoryName) {
        // You can extend this mapping based on your categories
        const emojiMap = {
            'aventura': '/assets/treasure-map.png',
            'accion': '/assets/action.png',
            'puzzle': '/assets/puzzle.png',
            'arcade': '/assets/arcade.png',
            // Add more mappings as needed
        };
        return emojiMap[categoryName] || '🎯'; // Default emoji if no match
    }

    #render(shadow) {
        console.log('cats: ', this.categories)
        const cats = [];
        const categoryLinks = this.categories
            .filter((category) => {
                if (!cats.includes(category.nombre)) {
                    cats.push(category.nombre); // Use push() for arrays
                    return true;
                }
                return false;
            })
            .map((category) => `
            <a href="/gamelist?id=${category.id}" class="nav-item">
                <img src="${this.#getCategoryEmoji(category.nombre)}" width="20px" style="margin-right: 6px"/> ${category.nombre}
            </a>
        `)
            .join('');

        shadow.innerHTML += `
            <div class="sidenav-mobile">
                <a href="/">
                    <img class="logo" src="/assets/icon.svg"/>
                </a>
                <a href="/profile" class="nav-item"><img src="/assets/avatar.png" width="20px"/></a>
                <a href="/profile" class="nav-item"><img src="/assets/bookshelf.png" width="20px"/></a>
                ${this.categories.map(category => `
                    <a href="#" class="nav-item">${this.#getCategoryEmoji(category.nombre)}</a>
                `).join('')}
            </div>
            <div class="sidenav">
                <a href="/">
                    <img class="logo" src="/assets/iconlogo.svg"/>
                </a>
                <a href="/profile" class="nav-item"><img src="/assets/avatar.png" width="20px" style="margin-right: 6px"/> Perfil</a>
                <a href="/profile" class="nav-item"><img src="/assets/bookshelf.png" width="20px" style="margin-right: 6px"/> Biblioteca</a>
                
                <div class="section-title">Categoría</div>
                ${categoryLinks}
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