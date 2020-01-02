

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Rsvps", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      ticket_id: {
        type: Sequelize.UUID,
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
