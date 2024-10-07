/* const CategoriaJuego = require('../models/CategoriaJuego.js');

class CategoriaJuegoDAO {
    async createCategoriaJuego(categoriaJuegoData) {
        const categoriaJuego = new CategoriaJuego(categoriaJuegoData);
        return await categoriaJuego.save();
    }

    async getCategoriaJuegoByIds(categoriaId, juegoId) {
        return await CategoriaJuego.findOne({ categoriaId, juegoId });
    }

    async getAllCategoriasJuegos() {
        return await CategoriaJuego.find({}).populate('categoriaId').populate('juegoId');
    }

    async deleteCategoriaJuego(categoriaJuegoIds) {
        return await CategoriaJuego.deleteMany({ _id: { $in: categoriaJuegoIds } });
    }
}

module.exports = new CategoriaJuegoDAO();*/

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

