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
        type: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUIDV4
      },
      ticket_id: {
        type: Sequelize.UUIDV4
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
