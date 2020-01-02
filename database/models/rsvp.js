module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define(
    'Rsvp',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      ticket_id: DataTypes.UUID,
    },
    {},
  );
  return Rsvp;
};
