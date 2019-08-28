export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
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
