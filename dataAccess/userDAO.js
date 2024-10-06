const Usuario = require('../models/Usuario.js');

class UsuarioDao {
    async createUsuario(usuarioData) {
        const user = await Usuario.create(usuarioData);
        return user;
    }

    async getProductById(usuarioId) {
        return await Usuario.findById(usuarioId);
    }

    async getAllProducts() {
        return await Usuario.find({});
    }

    async updateProduct(usuarioId, usuarioData) {
        return await Usuario.findByIdAndUpdate(usuarioId, usuarioData, { new: true });
    }

    async deleteProduct(usuarioId) {
        return await Usuario.findByIdAndDelete(usuarioId);
    }
}

module.exports = new UsuarioDao();