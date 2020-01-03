

module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    'Ticket',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      ticket_no: DataTypes.INTEGER,
      used: DataTypes.BOOLEAN,
    },
    {},
  );
  Ticket.associate = function (models) {
    // associations can be defined here
    Ticket.belongsTo(models.Event, {
      foreignKey: 'event_id',
      onDelete: 'CASCADE',
    });
    Ticket.hasMany(models.Rsvp, {
      foreignKey: 'ticket_id',
      onDelete: 'CASCADE',
    });
  };
  return Ticket;
};
