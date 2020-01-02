"use strict";
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "Session",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      event_id: DataTypes.UUIDV4,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      speaker: DataTypes.STRING,
      topic: DataTypes.STRING,
      venue: DataTypes.STRING,
      date: DataTypes.DATE
    },
    {}
  );
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};
