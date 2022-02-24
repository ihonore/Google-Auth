module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    googleId: DataTypes.STRING,
    information: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'profile',
      onDelete: 'CASCADE'
    });
  };
  return User;
};