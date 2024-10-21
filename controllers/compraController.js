const juegosDAO = require('../dataAccess/juegosDAO');
const compraDAO = require('../dataAccess/compraDAO');
const { AppError } = require('../utils/appError');

class compraController {

    static async crearCompra(req, res, next) {
        try {
            const { precio_compra, juego_id, usuario_id } = req.body;
            if (!nombre || !precio || !categoria) {
                return next(new AppError('Los campos precio_compra, juego_id, usuario_id son requeridos.', 400));
            }
            const nuevaCompra = await compraDAO.createCompra({ precio_compra, juego_id, usuario_id });
            res.status(201).json(nuevaCompra);
        } catch (error) {
            next(new AppError('Error al crear el compra.', 500));
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
