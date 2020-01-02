"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      ticket_no: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      used: DataTypes.BOOLEAN
    },
    {}
  );
  Ticket.associate = function(models) {
    // associations can be defined here
  };
  return Ticket;
};
