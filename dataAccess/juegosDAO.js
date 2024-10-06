const Juego = require('../models/Juego.js');

class JuegosDAO {
    async createJuego(juegoData) {
        const juego = new Juego(juegoData);
        return await juego.save();
    }

    async getJuegoById(juegoId) {
        return await Juego.findById(juegoId).populate('categoriaId');
    }

    async getAllJuegos() {
        return await Juego.find({}).populate('categoriaId');
    }

    async updateJuego(juegoId, juegoData) {
        return await Juego.findByIdAndUpdate(juegoId, juegoData, { new: true });
    }

    async deleteJuego(juegoId) {
        return await Juego.findByIdAndDelete(juegoId);
    }
}

module.exports = new JuegosDAO();