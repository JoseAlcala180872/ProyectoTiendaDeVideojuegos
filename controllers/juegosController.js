const juegosDAO = require('../dataAccess/juegosDAO');
const { AppError } = require('../utils/appError');

class juegosController {
    
    static async crearJuego(req, res, next) {
        try {
            const { nombre, precio, categoria } = req.body;
            if (!nombre || !precio || !categoria) {
                return next(new AppError('Los campos nombre, precio y categoria son requeridos.', 400));
            }
            const nuevoJuego = await juegosDAO.crearJuego({ nombre, precio, categoria });
            res.status(201).json(nuevoJuego);
        } catch (error) {
            next(new AppError('Error al crear el juego.', 500));
        }
    }

    static async getJuegoById(req, res, next) {
        try {
            const id = req.params.id;
            const juego = await juegosDAO.getJuegoById(id);
            if (!juego) {
                return next(new AppError('Juego no encontrado.', 404));
            }
            res.status(200).json(juego);
        } catch (error) {
            next(new AppError('Error al obtener el juego.', 500));
        }
    }

    static async getAllJuegos(req, res, next) {
        try {
            const limit = req.query.limit || 10;
            const juegos = await juegosDAO.getAllJuegos(limit);
            if (!juegos) {
                return next(new AppError('Juegos no encontrados.', 404));
            }
            res.status(200).json(juegos);
        } catch (error) {
            next(new AppError('Error al obtener los juegos.', 500));
        }
    }

    static async updateJuego(req, res, next) {
        try {
            const id = req.params.id;
            const juegoExists = await juegosDAO.getJuegoById(id);
            if (!juegoExists) {
                return next(new AppError('Juego no encontrado.', 404));
            }
            const juegoData = req.body;
            const juego = await juegosDAO.updateJuego(id, juegoData);
            res.status(200).json(juego);
        } catch (error) {
            next(new AppError('Error al actualizar el juego.', 500));
        }
    }

    static async deleteJuego(req, res, next) {
        try {
            const id = req.params.id;
            const juegoExists = await juegosDAO.getJuegoById(id);
            if (!juegoExists) {
                return next(new AppError('Juego no encontrado.', 404));
            }
            await juegosDAO.deleteJuego(id);
            res.status(200).json({ mensaje: 'Juego eliminado con éxito.' });
        } catch (error) {
            next(new AppError('Error al eliminar el juego.', 500));
        }
    }
}

module.exports = juegosController;
