const { JuegoCategoria } = require('../models/Migracion');

class CategoriaJuegoDAO {
    async createCategoriaJuego(categoriaJuegoData) {
        return await JuegoCategoria.create(categoriaJuegoData);
    }

    async getCategoriaJuegoByIds(categoriaId, juegoId) {
        return await JuegoCategoria.findOne({ where: { categoriaId, juegoId } });
    }

    async getAllCategoriasJuegos() {
        return await JuegoCategoria.findAll();
    }

    async deleteCategoriaJuego(categoriaJuegoIds) {
        return await JuegoCategoria.destroy({ where: { id: categoriaJuegoIds } });
    }
}

module.exports = new CategoriaJuegoDAO();

