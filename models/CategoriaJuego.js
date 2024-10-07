'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategoriaJuego extends Model {
        static associate(models) {
            // Tabla intermedia
            CategoriaJuego.belongsTo(models.Categoria, { foreignKey: 'categoriaId' });
            CategoriaJuego.belongsTo(models.Juego, { foreignKey: 'juegoId' });
        }
    }
    CategoriaJuego.init({
        // Claves foráneas
        categoriaId: DataTypes.INTEGER,
        juegoId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'CategoriaJuego',
    });
    return CategoriaJuego;
};
