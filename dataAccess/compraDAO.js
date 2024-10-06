const Compra = require('../models/Compra.js');

class CompraDAO {
    async createCompra(compraData) {
        const compra = new Compra(compraData);
        return await compra.save();
    }

    async getCompraById(compraId) {
        return await Compra.findById(compraId);
    }

    async getAllCompras() {
        return await Compra.find({});
    }

    async updateCompra(compraId, compraData) {
        return await Compra.findByIdAndUpdate(compraId, compraData, { new: true });
    }

    async deleteCompra(compraId) {
        return await Compra.findByIdAndDelete(compraId);
    }
}

module.exports = new CompraDAO();