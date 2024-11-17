
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
