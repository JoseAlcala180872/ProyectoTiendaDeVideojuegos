'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CompraJuego', {
      compraId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Compras',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      juegoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Juegos',
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

    // Add a composite primary key
    await queryInterface.addConstraint('CompraJuego', {
      fields: ['compraId', 'juegoId'],
      type: 'unique',
      name: 'compra_juego_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CompraJuego');
  }
};