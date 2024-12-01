'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CompraJuego extends Model {
        static associate(models) {
            // Remove the explicit associations here since they're defined in Compra and Juego models
        }
    }
    CompraJuego.init({
        compraId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Compras',
                key: 'id'
            }
        },
        juegoId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Juegos',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'CompraJuego',
        tableName: 'CompraJuego'
    });
    return CompraJuego;
};