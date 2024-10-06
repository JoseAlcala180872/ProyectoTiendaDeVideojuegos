'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Juego extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Define relación muchos a uno con Compra
      Juego.belongsToMany(models.Compra, { through: 'ComprasJuegos' });
      Juego.belongsToMany(models.Categoria, { through: 'JuegosCategoria' });
    }
  }
  Juego.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    desarrollador: DataTypes.STRING,
    fecha_lanzamiento: DataTypes.DATE,
    precio: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Juego',
  });
  return Juego;
};