"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      type: DataTypes.STRING,
      img: DataTypes.STRING,
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      location: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      capacity: DataTypes.INTEGER
    },
    {}
  );
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, {
      foreignKey: 'creator',
      onDelete: 'CASCADE'
    });
  };
  return Event;
};
