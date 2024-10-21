'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Juego extends Model {

    static associate(models) {

      //Asociación de muchos a muchos con Compra y Categoria
      Juego.belongsToMany(models.Compra, { through: 'CompraJuego' });
      Juego.belongsToMany(models.Categoria, { through: 'CategoriaJuego' });

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