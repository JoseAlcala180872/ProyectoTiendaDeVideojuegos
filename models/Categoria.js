'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    
    static associate(models) {
      //Asociación muchos a muchos con Juego
      Categoria.belongsToMany(models.Juego, { through: 'JuegosCategoria' });


    }
  }
  Categoria.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};