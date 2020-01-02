"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Rsvps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUIDV4
      },
      event_id: {
        type: Sequelize.UUIDV4,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUIDV4,
        allowNull: false
      },
      ticket_id: {
        type: Sequelize.UUIDV4,
        allowNull: false
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Rsvps");
  }
};
