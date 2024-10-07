const { CategoriaJuego } = require('../models/Migracion');

class CategoriaJuegoDAO {
    async createCategoriaJuego(categoriaJuegoData) {
        return await CategoriaJuego.create(categoriaJuegoData);
    }

    async getCategoriaJuegoByIds(categoriaId, juegoId) {
        return await CategoriaJuego.findOne({ where: { categoriaId, juegoId } });
    }

    async getAllCategoriasJuegos() {
        return await CategoriaJuego.findAll();
    }

    async deleteCategoriaJuego(categoriaJuegoIds) {
        return await CategoriaJuego.destroy({ where: { id: categoriaJuegoIds } });
    }
}

module.exports = new CategoriaJuegoDAO();

