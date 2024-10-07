/* const Juego = require('../models/Juego.js');

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

module.exports = new JuegosDAO();*/

const { Juego } = require('../models/Migracion');

class JuegosDAO {
    async createJuego(juegoData) {
        return await Juego.create(juegoData);
    }

    async getJuegoById(juegoId) {
        return await Juego.findByPk(juegoId);  // findByPk es el equivalente en Sequelize
    }

    async getAllJuegos() {
        return await Juego.findAll();  // Sequelize usa findAll() para obtener todos los registros
    }

    async updateJuego(juegoId, juegoData) {
        const juego = await Juego.findByPk(juegoId);
        if (juego) {
            return await juego.update(juegoData);
        }
        return null;
    }

    async deleteJuego(juegoId) {
        const juego = await Juego.findByPk(juegoId);
        if (juego) {
            return await juego.destroy();
        }
        return null;
    }
}

module.exports = new JuegosDAO();
