'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    static associate(models) {
      //Asociación uno a muchos con Usuario
      Compra.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });

      //Asociación muchos a muchos con Juego
      Compra.belongsToMany(models.Juego, {
        through: models.CompraJuego,
        foreignKey: 'compraId',
        otherKey: 'juegoId',
        tableName: 'CompraJuego'
      });
    }
  }
  Compra.init({
    precio_compra: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};