'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.belongsToMany(models.Juego, {
        through: 'JuegosCategoria',
        foreignKey: 'categoriaId'
      });
    }
  }
  Categoria.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'Categorias'  // Explicitly set table name
  });
  return Categoria;
};