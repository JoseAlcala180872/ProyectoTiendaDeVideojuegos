const { Compra } = require('../models/Migracion');
const usuarioDAO = require('../dataAccess/userDAO');

class CompraDAO {
    async createCompra(compraData) {
        const { juegoId, usuarioId, ...restData } = compraData;

        const usuario = await usuarioDAO.getUsuarioById(usuarioId);
        if (!usuario) {
            throw new Error('Usuario not found');
        }

        // Create the compra first
        const compra = await Compra.create({
            ...restData,
            usuarioId: usuarioId
        });

        // Then associate the games
        if (juegoId && juegoId.length > 0) {
            await compra.addJuegos(juegoId);
        }

        // Return the compra with its associations
        return await Compra.findByPk(compra.id, {
            include: [
                {
                    association: 'Usuario',
                    attributes: ['id', 'nombre'] // adjust attributes as needed
                },
                {
                    association: 'Juegos'
                }
            ]
        });
    }
    async getCompraById(compraId) {
        return await Compra.findByPk(compraId);
    }

    async getAllCompras() {
        try {
            return await Compra.findAll({
                include: [
                    {
                        association: 'Usuario',
                        attributes: ['id', 'nombre']
                    },
                    {
                        association: 'Juegos',
                        attributes: ['id', 'titulo']
                    }
                ],
            });
        } catch (error) {
            console.log('error: ', error)
        }
    }

    async updateCompra(compraId, compraData) {
        const compra = await Compra.findByPk(compraId);
        if (compra) {
            return await compra.update(compraData);
        }
        return null;
    }

    async deleteCompra(compraId) {
        const compra = await Compra.findByPk(compraId);
        if (compra) {
            return await compra.destroy();
        }
        return null;
    }
}

module.exports = new CompraDAO();
