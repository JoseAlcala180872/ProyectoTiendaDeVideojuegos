export class FeaturedGames extends HTMLElement {
    constructor() {
        super();
        this.games = [];
        this.currentSlide = 0;
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        await this.#fetchGames();
        this.#render(shadow);
        this.#setupCarousel(shadow);
        this.#agregarEstilos(shadow);
    }

    async #fetchGames() {
        try {
            const response = await fetch('/api/juegos');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const allGames = await response.json();
            // Get first 4 games
            this.games = allGames.slice(0, 4);
        } catch (error) {
            console.error('Error fetching games:', error);
            this.games = [];
        }
    }

    #setupCarousel(shadow) {
        const prevButton = shadow.querySelector('.carousel-prev');
        const nextButton = shadow.querySelector('.carousel-next');
        const dots = shadow.querySelectorAll('.dot');

        prevButton.addEventListener('click', () => {
            this.currentSlide = (this.currentSlide - 1 + this.games.length) % this.games.length;
            this.#updateCarousel(shadow);
        });

        nextButton.addEventListener('click', () => {
            this.currentSlide = (this.currentSlide + 1) % this.games.length;
            this.#updateCarousel(shadow);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentSlide = index;
                this.#updateCarousel(shadow);
            });
        });

        // Auto advance carousel
        setInterval(() => {
            this.currentSlide = (this.currentSlide + 1) % this.games.length;
            this.#updateCarousel(shadow);
        }, 5000);
    }

    #updateCarousel(shadow) {
        const carousel = shadow.querySelector('.carousel-content');
        const dots = shadow.querySelectorAll('.dot');

        carousel.style.transform = `translateX(-${this.currentSlide * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    #render(shadow) {
        if (!this.games.length) {
            shadow.innerHTML = `
          <div class="featured">
            <h2 class="title">Error loading games data</h2>
          </div>
        `;
            return;
        }

        shadow.innerHTML = `
        <div class="featured">
          <h2 class="title">Destacados</h2>
          <div class="carousel-container">
            <button class="carousel-prev">❮</button>
            <div class="carousel-wrapper">
              <div class="carousel-content">
                ${this.games.map(game => `
                  <div class="carousel-slide">
                    <div class="carousel-item">
                      <a href="/game?id=${game.id}" class="game-link">
                        <img src="${game.imagenUrl[0]}" alt="${game.titulo}" class="main-image">
                      </a>
                    </div>
                    <div class="carousel-item-info">
                      <h2 class="game-title">${game.titulo}</h2>
                      <p class="game-description">${game.descripcion}</p>
                      <div class="thumbnails">
                        ${game.imagenUrl.slice(1, 5).map(thumb => `
                          <img src="${thumb}" alt="${game.titulo}" class="thumbnail">
                        `).join('')}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <button class="carousel-next">❯</button>
          </div>
          <div class="dots">
            ${this.games.map((_, index) => `
              <div class="dot ${index === 0 ? 'active' : ''}"></div>
            `).join('')}
          </div>
        </div>
      `;
    }

    #agregarEstilos(shadow) {
        const style = document.createElement("style");
        style.textContent = `
        .featured {
          margin: 20px 0;
        }
  
        .title {
          font-size: 24px;
          margin-bottom: 20px;
          color: var(--text-color);
        }
  
        .carousel-container {
          position: relative;
          margin: 0 auto;
          max-width: 1200px;
        }
  
        .carousel-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          background-color: var(--secondary-color);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
  
        .carousel-content {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }
  
        .carousel-slide {
          flex: 0 0 100%;
          display: flex;
          min-height: 400px;
        }
  
        .carousel-prev,
        .carousel-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          z-index: 2;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
        }
  
        .carousel-prev:hover,
        .carousel-next:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
  
        .carousel-prev {
          left: -20px;
        }
  
        .carousel-next {
          right: -20px;
        }
  
        .carousel-item {
          width: 50%;
          padding: 20px;
        }
  
        .carousel-item-info {
          width: 50%;
          padding: 30px;
          display: flex;
          flex-direction: column;
        }
  
        .game-link {
          display: block;
          height: 100%;
          text-decoration: none;
        }
  
        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }
  
        .main-image:hover {
          transform: scale(1.03);
        }
  
        .game-title {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 15px;
          color: var(--text-color);
        }
  
        .game-description {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
          color: var(--text-color);
          opacity: 0.9;
        }
  
        .thumbnails {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 10px;
          margin-top: auto;
        }
  
        .thumbnail {
          width: 100%;
          height: 80px;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
  
        .thumbnail:hover {
          transform: scale(1.05);
        }
  
        .dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }
  
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }
  
        .dot:hover {
          background-color: rgba(255, 255, 255, 0.5);
        }
  
        .dot.active {
          background-color: var(--accent-color);
          transform: scale(1.2);
        }
  
        @media (max-width: 768px) {
          .carousel-slide {
            flex-direction: column;
          }
  
          .carousel-item,
          .carousel-item-info {
            width: 100%;
            padding: 15px;
          }
  
          .game-title {
            font-size: 24px;
          }
  
          .carousel-prev,
          .carousel-next {
            width: 30px;
            height: 30px;
            font-size: 16px;
          }
  
          .thumbnail {
            height: 60px;
          }
        }
      `;
        shadow.appendChild(style);
    }
}