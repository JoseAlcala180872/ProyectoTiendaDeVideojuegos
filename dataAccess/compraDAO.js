/*const Compra = require('../models/Compra.js');

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

module.exports = new CompraDAO();*/

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
