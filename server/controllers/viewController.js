const { AppError } = require('../utils/appError');
const path = require('path');
const { readFile } = require('fs/promises');

class viewController {
    static async getHomePage(req, res, next) {
        try {
            res.sendFile(path.join(__dirname, '../../view', 'index.html'));
        } catch (error) {
            next(new AppError('Error al solicitar pagina.', 500));
        }
    }

    static async getGamePage(req, res, next) {
        try {
            const gameId = req.query.id;

            console.log('gameid: ', gameId);

            if (!gameId) {
                return next(new AppError('Game ID is required', 400));
            }

            const htmlPath = path.join(__dirname, '../../view/pages/GamePage', 'GamePage.html');
            let htmlContent = await readFile(htmlPath, 'utf-8');

            htmlContent = htmlContent.replace(
                '<game-details-header',
                `<game-details-header game-id="${gameId}"`
            );

            res.send(htmlContent);
        } catch (error) {
            console.log('error: ', error);
            next(new AppError('Error al solicitar pagina.', 500));
        }
    }

    static async getGameListPage(req, res, next) {
        try {
            const category = req.query.id;

            console.log('categoryid: ', category);

            if (!category) {
                return next(new AppError('Category ID is required', 400));
            }

            const htmlPath = path.join(__dirname, '../../view/pages/GameList', 'GameList.html');
            let htmlContent = await readFile(htmlPath, 'utf-8');

            htmlContent = htmlContent.replace(
                '<games-grid',
                `<games-grid cat-id="${category}"`
            );

            res.send(htmlContent);
        } catch (error) {
            console.log('error: ', error);
            next(new AppError('Error al solicitar pagina.', 500));
        }
    }

    static async getCarrito(req, res, next) {
        try {
            res.sendFile(path.join(__dirname, '../../view/pages/ShoppingCart', 'ShoppingCart.html'));
        } catch (error) {
            next(new AppError('Error al solicitar pagina.', 500));
        }
    }

    static async getProfile(req, res, next) {
        try {
            res.sendFile(path.join(__dirname, '../../view/pages/Profile', 'Profile.html'));
        } catch (error) {
            next(new AppError('Error al solicitar pagina.', 500));
        }
    }

    static async getNotFound(req, res, next) {
        try {
            res.sendFile(path.join(__dirname, '../../view/pages/NotFound', 'NotFound.html'));
        } catch (error) {
            next(new AppError('Error al solicitar pagina.', 500));
        }
    }

}

module.exports = viewController;