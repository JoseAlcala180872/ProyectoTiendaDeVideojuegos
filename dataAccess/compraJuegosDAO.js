const CompraJuego = require('../models/CompraJuego.js');

class CompraJuegosDAO {
    async createCompraJuego(compraJuegoData) {
        const compraJuego = new CompraJuego(compraJuegoData);
        return await compraJuego.save();
    }

    async getCompraJuegosByCompra(compraId) {
        return await CompraJuego.find({ compraId }).populate('juegoId');
    }

    async deleteCompraJuegos(compraIds) {
        return await CompraJuego.deleteMany({ compraIds });
    }
}

module.exports = new CompraJuegosDAO();