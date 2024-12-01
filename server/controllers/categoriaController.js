const categoriaDAO = require('../dataAccess/categoriaDAO');
const categoriaJuegoDAO = require('../dataAccess/categoriaJuegoDAO');
const { AppError } = require('../utils/appError');

class categoriaController {
    static async crearCategoria(req, res, next) {
        try {
            const { nombre, descripcion } = req.body;
            if (!nombre || !descripcion) {
                next(new AppError('Los campos nombre, descripcion son requeridos.', 500));
            }
            const categoriaData = { nombre, descripcion };
            const categoria = await categoriaDAO.createCategoria(categoriaData);
            res.status(201).json(categoria);
        } catch (error) {
            next(new AppError('Error al crear categoria.', 500));
        }
    }

    static async crearCategoriaMatch(req, res, next) {
        try {
            const { juegoId, categoriaId } = req.body;
            if (!juegoId || !categoriaId) {
                next(new AppError('Los campos juegoId, categoriaId son requeridos.', 500));
            }
            const categoriaData = { juegoId, categoriaId };
            const categoria = await categoriaJuegoDAO.createCategoriaJuego(categoriaData);
            res.status(201).json(categoria);
        } catch (error) {
            next(new AppError('Error al crear categoria-juego.', 500));
        }
    }

    static async obtenerCategoriasMatch(req, res, next) {
        try {
            const categorias = await categoriaJuegoDAO.getAllCategoriasJuegos();

            if (!categorias) {
                next(new AppError('Categorias-Juego no encontradas', 404));
            }

            res.status(200).json(categorias);
        } catch (error) {
            console.log('error al obtener todas las categorias-juego:  ', error)
            next(new AppError('Error al obtener categorias-juego.', 500));
        }
    }

    static async obtenerCategorias(req, res, next) {
        try {
            const categorias = await categoriaDAO.getAllCategorias();

            if (!categorias) {
                next(new AppError('Categorias no encontradas', 404));
            }

            res.status(200).json(categorias);
        } catch (error) {
            console.log('error al obtener todas las categorias:  ', error)
            next(new AppError('Error al obtener categorias.', 500));
        }
    }

    static async obtenerCategoriaPorId(req, res, next) {
        try {
            const id = req.params.id;
            const categoria = await categoriaDAO.getCategoriaById(id);

            if (!categoria) {
                next(new AppError('Categoria no encontrada.', 404));
            }

            res.status(200).json(categoria);
        } catch (error) {
            next(new AppError('Error al obtener categoria.', 500))
        }
    }

    static async actualizarCategoria(req, res, nex) {
        try {
            const id = req.params.id;
            const categoriaexists = await categoriaDAO.getCategoriaById(id);

            if (!categoriaexists) {
                next(new AppError('Categoria no encontrada.', 404));
            }

            const categoriaData = req.body;
            const categoria = await categoriaDAO.updateCategoria(id, categoriaData);

            if (!categoria) {
                next(new AppError('Categoria no encontrada.', 404));
            }

            res.status(200).json(categoria);
        } catch (error) {
            next(new AppError('Error al actualizar la categoria.', 500));
        }

    }

    static async eliminarCategoria(req, res, nex) {
        try {
            const id = req.params.id;
            const categoriaexists = await categoriaDAO.getCategoriaById(id);

            if (!categoriaexists) {
                next(new AppError('Categoria no encontrada.', 404));
            }

            const categoria = await categoriaDAO.deleteCategoria(id);

            if (!categoria) {
                next(new AppError('Error al eliminar la categoria.', 500));
            }

            const msjReturn = {
                mensaje: 'Categoria eliminada con exito.'
            };

            res.status(200).json(msjReturn);
            res.status(200).json(categoria);
        } catch (error) {
            next(new AppError('Error al eliminar la categoria.', 500));
        }

    }
}

module.exports = categoriaController;