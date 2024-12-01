'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {

      //Asociación uno a muchos con Compra
      Usuario.hasMany(models.Compra, { foreignKey: 'usuarioId' });

    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    clave: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
  });
  return Usuario;
};