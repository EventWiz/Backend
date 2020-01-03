

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'Session',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      speaker: DataTypes.STRING,
      topic: DataTypes.TEXT,
      venue: DataTypes.TEXT,
      date: DataTypes.DATE,
    },
    {},
  );
  Session.associate = function (models) {
    // associations can be defined here
    Session.belongsTo(models.Event, {
      foreignKey: 'event_id',
      onDelete: 'CASCADE',
    });
  };
  return Session;
};
