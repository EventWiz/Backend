
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sessions', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    event_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    start_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    speaker: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    topic: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    venue: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Sessions'),
};
