const juegosDAO = require('../dataAccess/juegosDAO');

//Esta clase/servicio se comunica con los DAOS
class juegosService {

    static async crearJuego(juegoData) {
        return await juegosDAO.createJuego(juegoData);
    }

    static async getJuegoById(id) {
        return await juegosDAO.getJuegoById(id);
    }

    static async getAllJuegos(limit) {
        return await juegosDAO.getAllJuegos(limit);
    }

    static async updateJuego(id, juegoData) {
        return await juegosDAO.updateJuego(id, juegoData);
    }

    static async deleteJuego(id) {
        return await juegosDAO.deleteJuego(id);
    }
}

module.exports = juegosService;
