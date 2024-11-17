const juegosDAO = require('../dataAccess/juegosDAO');
const { AppError } = require('../utils/appError');

class juegosController {

    static async crearJuego(req, res, next) {
        try {
            const { titulo, descripcion, desarrollador, fecha_lanzamiento, precio, imagenUrl } = req.body;
            if (!titulo || !descripcion || !desarrollador || !fecha_lanzamiento || !precio || !imagenUrl) {
                switch (true) {
                    case !titulo:
                        return next(new AppError('El campo titulo es requerido.', 400));

                    case !descripcion:
                        return next(new AppError('El campo descripcion es requerido.', 400));

                    case !desarrollador:
                        return next(new AppError('El campo desarrollador es requerido.', 400));

                    case !fecha_lanzamiento:
                        return next(new AppError('El campo fecha de lanzamiento es requerido.', 400));

                    case !precio:
                        return next(new AppError('El campo precio es requerido.', 400));

                    case !imagenUrl:
                        return next(new AppError('El campo imagenUrl es requerido.', 400));

                    case Array.isArray(imagenUrl) && imagenUrl.length === 0:
                        return next(new AppError('Debe proporcionar al menos una imagen.', 400));

                    case precio <= 0:
                        return next(new AppError('El precio debe ser mayor a 0.', 400));

                    default:
                        return null;
                }
            }
            const nuevoJuego = await juegosDAO.createJuego({ titulo, descripcion, imagenUrl, desarrollador, fecha_lanzamiento, precio });
            res.status(201).json(nuevoJuego);
        } catch (error) {
            console.log('error crear juego controller: ', error)
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
