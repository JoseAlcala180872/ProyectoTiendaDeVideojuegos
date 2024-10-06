const Categoria = require('../models/Categoria.js');

class CategoriaDAO {
    async createCategoria(categoriaData) {
        const categoria = new Categoria(categoriaData);
        return await categoria.save();
    }

    async getCategoriaById(categoriaId) {
        return await Categoria.findById(categoriaId);
    }

    async getAllCategorias() {
        return await Categoria.find({});
    }

    async updateCategoria(categoriaId, categoriaData) {
        return await Categoria.findByIdAndUpdate(categoriaId, categoriaData, { new: true });
    }

    async deleteCategoria(categoriaId) {
        return await Categoria.findByIdAndDelete(categoriaId);
    }
}

module.exports = new CategoriaDAO();