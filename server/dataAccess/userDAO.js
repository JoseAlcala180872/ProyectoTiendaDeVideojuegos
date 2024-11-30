const { Usuario } = require('../models/Migracion');

class UsuarioDao {
    async login(usuarioData) {
        const users = await Usuario.findAll();
        for (let item of users) {
            if (usuarioData.correo === item.dataValues.correo && usuarioData.clave === item.dataValues.clave) {
                return item.dataValues;
            }
        }
        return false;
    }

    async createUsuario(usuarioData) {
        const user = await Usuario.create(usuarioData);
        return user;
    }

    async getUsuarioById(usuarioId) {
        return await Usuario.findByPk(usuarioId);  // Sequelize usa findByPk en lugar de findById
    }

    async getAllUsuarios() {
        return await Usuario.findAll();  // En Sequelize es findAll() para obtener todos los registros
    }

    async updateUsuario(usuarioId, usuarioData) {
        const usuario = await Usuario.findByPk(usuarioId);
        if (usuario) {
            return await usuario.update(usuarioData);  // Actualiza los datos del usuario
        }
        return null;
    }

    async deleteUsuario(usuarioId) {
        const usuario = await Usuario.findByPk(usuarioId);
        if (usuario) {
            return await usuario.destroy();  // Elimina el usuario
        }
        return null;
    }
}

module.exports = new UsuarioDao();
