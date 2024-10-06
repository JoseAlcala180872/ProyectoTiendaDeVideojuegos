'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Define relación muchos a uno con Usuario
      Compra.belongsTo(models.Usuario);
      Compra.belongsToMany(models.Juego, { through: 'ComprasJuegos' });
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