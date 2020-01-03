
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tickets', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    ticket_no: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    event_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    used: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Tickets'),
};
