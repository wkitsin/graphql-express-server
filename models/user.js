export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: DataTypes.STRING
  });

  User.associate = models => {
    User.hasMany(models.Board, {
      foreignKey: "owner"
    });

    User.hasMany(models.Suggestion, {
      foreignKey: "creatorId"
    });
  };

  return User;
};
