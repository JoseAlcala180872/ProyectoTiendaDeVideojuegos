'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class JuegoCategoria extends Model {
        static associate(models) {
            // No explicit associations needed here
        }
    }
    JuegoCategoria.init({
        juegoId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Juegos',
                key: 'id'
            }
        },
        categoriaId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Categorias', // Note: pluralized table name
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'JuegoCategoria',
        tableName: 'JuegosCategoria'
    });
    return JuegoCategoria;
};