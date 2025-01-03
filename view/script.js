import { SideNav } from './components/SideNavigation/SideNavigation.js'
import { TopBar } from './components/TopBar/TopBar.js'
import { FeaturedGames } from './components/FeaturedGames/FeaturedGames.js'
import { GameCard } from './components/GameCard/GameCard.js'
import { GameDetailsHeader } from './components/GameDetailsHeader/GameDetailsHeader.js'
import { GameRecommendations } from './components/GameRecommendation/GameRecommendations.js'
import { GamesGrid } from './components/GamesGrid/GamesGrid.js'
import { ShoppingButton } from './components/ShoppingButton/ShoppingButton.js';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart.js'
import { AuthPopup } from './components/Auth/AuthPopup.js'
import { ProfileSection } from './components/Profile/ProfileSection.js';

customElements.define('side-nav', SideNav);
customElements.define('top-bar', TopBar);
customElements.define('featured-games', FeaturedGames);
customElements.define('game-card', GameCard);
customElements.define('game-details-header', GameDetailsHeader);
customElements.define('game-recommendations', GameRecommendations);
customElements.define('games-grid', GamesGrid);
customElements.define('shopping-button', ShoppingButton);
customElements.define('auth-popup', AuthPopup);
customElements.define('profile-section', ProfileSection);

document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});