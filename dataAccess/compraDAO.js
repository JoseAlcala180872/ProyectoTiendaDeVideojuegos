const { Compra } = require('../models/Migracion');

class CompraDAO {
    async createCompra(compraData) {
        return await Compra.create(compraData);
    }

    async getCompraById(compraId) {
        return await Compra.findByPk(compraId);
    }

    async getAllCompras() {
        return await Compra.findAll();
    }

    async updateCompra(compraId, compraData) {
        const compra = await Compra.findByPk(compraId);
        if (compra) {
            return await compra.update(compraData);
        }
        return null;
    }

    async deleteCompra(compraId) {
        const compra = await Compra.findByPk(compraId);
        if (compra) {
            return await compra.destroy();
        }
        return null;
    }
}

module.exports = new CompraDAO();
