module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userId: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    education: DataTypes.STRING
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  };
  return Profile;
};
