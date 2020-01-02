"use strict";
module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define(
    "Rsvp",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      event_id: DataTypes.UUIDV4,
      user_id: DataTypes.UUIDV4,
      ticket_id: DataTypes.UUIDV4
    },
    {}
  );
  Rsvp.associate = function(models) {
    // associations can be defined here
  };
  return Rsvp;
};
