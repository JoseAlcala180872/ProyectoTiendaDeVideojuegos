const compraDAO = require('../dataAccess/compraDAO');
const { AppError } = require('../utils/appError');

class compraController {

    static async crearCompra(req, res, next) {
        try {
            const { usuarioId, juegoId, precio_compra } = req.body;

            // Validate required fields
            if (!precio_compra || !juegoId || !usuarioId) {
                return next(new AppError('Se requiere precio_compra, array de juegoId, y usuarioId.', 400));
            }

            // Validate juegos array is not empty
            if (juegoId.length === 0) {
                return next(new AppError('Debe incluir al menos un juego en la compra.', 400));
            }

            const nuevaCompra = await compraDAO.createCompra({
                precio_compra: precio_compra,
                usuarioId: usuarioId,
                juegoId: juegoId
            });

            res.status(201).json(nuevaCompra);
        } catch (error) {
            console.error('Error en crearCompra:', error);
            next(new AppError('Error al crear la compra.', 500));
        }
    }

    static async getCompraById(req, res, next) {
        try {
            const id = req.params.id;
            const compra = await compraDAO.getCompraById(id);
            if (!compra) {
                return next(new AppError('Compra no encontrada.', 404));
            }
            res.status(200).json(compra);
        } catch (error) {
            next(new AppError('Error al obtener la compra.', 500));
        }
    }

    static async getAllCompras(req, res, next) {
        try {
            const limit = req.query.limit || 10;
            const compras = await compraDAO.getAllCompras(limit);
            if (!compras) {
                return next(new AppError('Compras no encontradas.', 404));
            }
            res.status(200).json(compras);
        } catch (error) {
            next(new AppError('Error al obtener las compras.', 500));
        }
    }

    static async updateCompra(req, res, next) {
        try {
            const id = req.params.id;
            const compraExists = await compraDAO.getCompraById(id);
            if (!compraExists) {
                return next(new AppError('Compra no encontrada.', 404));
            }
            const compraData = req.body;
            const compra = await compraDAO.updateCompra(id, compraData);
            res.status(200).json(compra);
        } catch (error) {
            next(new AppError('Error al actualizar la compra.', 500));
        }
    }

    static async deleteCompra(req, res, next) {
        try {
            const id = req.params.id;
            const compraExists = await compraDAO.getCompraById(id);
            if (!compraExists) {
                return next(new AppError('Compra no encontrada.', 404));
            }
            await compraDAO.deleteCompra(id);
            res.status(200).json({ mensaje: 'Compra eliminada con éxito.' });
        } catch (error) {
            next(new AppError('Error al eliminar la compra.', 500));
        }
    }
}

module.exports = compraController;
