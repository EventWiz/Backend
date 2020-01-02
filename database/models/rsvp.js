module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define(
    "Rsvp",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      }
    },
    {}
  );
  Rsvp.associate = function(models) {
    // associations can be defined here
    Rsvp.belongsTo(models.Event, {
      foreignKey: "event_id",
      onDelete: "CASCADE"
    });
    Rsvp.belongsTo(models.Ticket, {
      foreignKey: "ticket_id",
      onDelete: "CASCADE"
    });
    Rsvp.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE"
    });
  };
  return Rsvp;
};
