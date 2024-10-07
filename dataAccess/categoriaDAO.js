const { Categoria } = require('../models/Migracion');

class CategoriaDAO {
    async createCategoria(categoriaData) {
        return await Categoria.create(categoriaData);
    }

    async getCategoriaById(categoriaId) {
        return await Categoria.findByPk(categoriaId);
    }

    async getAllCategorias() {
        return await Categoria.findAll();
    }

    async updateCategoria(categoriaId, categoriaData) {
        const categoria = await Categoria.findByPk(categoriaId);
        if (categoria) {
            return await categoria.update(categoriaData);
        }
        return null;
    }

    async deleteCategoria(categoriaId) {
        const categoria = await Categoria.findByPk(categoriaId);
        if (categoria) {
            return await categoria.destroy();
        }
        return null;
    }
}

module.exports = new CategoriaDAO();

