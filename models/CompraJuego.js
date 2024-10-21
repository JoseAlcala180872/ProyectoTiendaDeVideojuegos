'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CompraJuego extends Model {
        static associate(models) {
            // Tabla intermedia
            CompraJuego.belongsTo(models.Compra, { foreignKey: 'compraId' });
            CompraJuego.belongsTo(models.Juego, { foreignKey: 'juegoId' });
        }
    }
    CompraJuego.init({
        // Claves foráneas
        categoriaId: DataTypes.INTEGER,
        juegoId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'CompraJuego',
    });
    return CompraJuego;
};
