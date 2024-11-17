const { CompraJuego } = require('../models/Migracion');


class CompraJuegosDAO {
    async createCompraJuego(compraJuegoData) {
        return CompraJuego.create(compraJuegoData);
    }

    async getCompraJuegosByCompra(compraId) {
        return await CompraJuego.find({ compraId }).populate('juegoId');
    }

    async deleteCompraJuegos(compraIds) {
        return await CompraJuego.deleteMany({ compraIds });
    }
}

module.exports = new CompraJuegosDAO();