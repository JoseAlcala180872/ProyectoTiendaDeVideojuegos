import { SideNav } from './components/SideNavigation/SideNavigation.js'
import { TopBar } from './components/TopBar/TopBar.js'
import { FeaturedGames } from './components/FeaturedGames/FeaturedGames.js'
import { GameCard } from './components/GameCard/GameCard.js'
import { GameDetailsHeader } from './components/GameDetailsHeader/GameDetailsHeader.js'
import { GameRecommendations } from './components/GameRecommendation/GameRecommendations.js'


customElements.define('side-nav', SideNav);
customElements.define('top-bar', TopBar);
customElements.define('featured-games', FeaturedGames);
customElements.define('game-card', GameCard);
customElements.define('game-details-header', GameDetailsHeader);
customElements.define('game-recommendations', GameRecommendations);