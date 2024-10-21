const usuarioDAO = require('../dataAccess/usuarioDAO');
const { AppError } = require('../utils/appError');

class usuarioController {

    static async crearUsuario(req, res, next) {
        try {
            const { nombre, correo, contraseña } = req.body;
            if (!nombre || !correo || !contraseña) {
                return next(new AppError('Los campos nombre, correo y contraseña son requeridos.', 400));
            }
            const nuevoUsuario = await usuarioDAO.crearUsuario({ nombre, correo, contraseña });
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            next(new AppError('Error al crear el usuario.', 500));
        }
    }

    static async getUsuarioById(req, res, next) {
        try {
            const id = req.params.id;
            const usuario = await usuarioDAO.getUsuarioById(id);
            if (!usuario) {
                return next(new AppError('Usuario no encontrado.', 404));
            }
            res.status(200).json(usuario);
        } catch (error) {
            next(new AppError('Error al obtener el usuario.', 500));
        }
    }

    static async getAllUsuarios(req, res, next) {
        try {
            const limit = req.query.limit || 10;
            const usuarios = await usuarioDAO.getAllUsuarios(limit);
            if (!usuarios || usuarios.length === 0) {
                return next(new AppError('Usuarios no encontrados.', 404));
            }
            res.status(200).json(usuarios);
        } catch (error) {
            next(new AppError('Error al obtener los usuarios.', 500));
        }
    }

    static async updateUsuario(req, res, next) {
        try {
            const id = req.params.id;
            const usuarioExists = await usuarioDAO.getUsuarioById(id);
            if (!usuarioExists) {
                return next(new AppError('Usuario no encontrado.', 404));
            }
            const usuarioData = req.body;
            const usuario = await usuarioDAO.updateUsuario(id, usuarioData);
            res.status(200).json(usuario);
        } catch (error) {
            next(new AppError('Error al actualizar el usuario.', 500));
        }
    }

    static async deleteUsuario(req, res, next) {
        try {
            const id = req.params.id;
            const usuarioExists = await usuarioDAO.getUsuarioById(id);
            if (!usuarioExists) {
                return next(new AppError('Usuario no encontrado.', 404));
            }
            await usuarioDAO.deleteUsuario(id);
            res.status(200).json({ mensaje: 'Usuario eliminado con éxito.' });
        } catch (error) {
            next(new AppError('Error al eliminar el usuario.', 500));
        }
    }
}

module.exports = usuarioController;
