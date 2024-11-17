'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Juego extends Model {
    static associate(models) {
      Juego.belongsToMany(models.Categoria, {
        through: 'JuegosCategoria',
        foreignKey: 'juegoId'
      });
      Juego.belongsToMany(models.Compra, {
        through: 'CompraJuegos',
        foreignKey: 'juegoId'
      });
    }
  }
  Juego.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    imagenUrl: {
      type: DataTypes.JSON,
      defaultValue: [],
      get() {
        const rawValue = this.getDataValue('imagenUrl');
        return rawValue ? JSON.parse(JSON.stringify(rawValue)) : [];
      },
      set(value) {
        this.setDataValue('imagenUrl',
          Array.isArray(value) ? value : [value]
        );
      }
    },
    desarrollador: DataTypes.STRING,
    fecha_lanzamiento: DataTypes.DATE,
    precio: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Juego',
    tableName: 'Juegos'
  });
  return Juego;
};