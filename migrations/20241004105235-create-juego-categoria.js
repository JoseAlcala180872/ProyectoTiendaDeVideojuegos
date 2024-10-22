'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JuegosCategoria', {
      juegoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Juegos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Categorias', // Note: pluralized table name
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add unique constraint
    await queryInterface.addConstraint('JuegosCategoria', {
      fields: ['juegoId', 'categoriaId'],
      type: 'unique',
      name: 'juego_categoria_unique'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JuegosCategoria');
  }
};