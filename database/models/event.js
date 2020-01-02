/* eslint-disable func-names */


module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      type: DataTypes.STRING,
      img: DataTypes.STRING,
      title: DataTypes.STRING,
      desc: DataTypes.TEXT,
      location: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      capacity: DataTypes.INTEGER,
    },
    {},
  );
  Event.associate = function (models) {
    // associations can be defined here
    Event.belongsToMany(models.User, {
      as: 'attendees',
      through: models.Rsvp,
      foreignKey: 'event_id',
      onDelete: 'CASCADE',
    });
    Event.hasMany(models.Ticket, {
      foreignKey: 'event_id',
      onDelete: 'CASCADE',
    });
    Event.hasMany(models.Session, {
      foreignKey: 'event_id',
      onDelete: 'CASCADE',
    });
  };
  return Event;
};
