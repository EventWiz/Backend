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
        references: {
          model: "Events",
          key: "id"
        }
      },
      user_id: {
        type: Sequelize.UUIDV4,
        references: {
          model: "Users",
          key: "id"
        }
      },
      ticket_id: {
        type: Sequelize.UUIDV4,
        references: {
          model: "Tickets",
          key: "id"
        }
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
