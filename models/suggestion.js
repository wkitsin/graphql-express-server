export default (sequelize, DataTypes) => {
  const Suggestion = sequelize.define("suggestion", {
    content: DataTypes.STRING
  });

  return Suggestion;
};
