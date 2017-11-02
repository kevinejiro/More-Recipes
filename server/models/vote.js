
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    voteType: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Vote.associate = (models) => {
    Vote.belongsTo(models.Recipe, { // associate vote to a recipe
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Vote.belongsTo(models.User, { // associate vote to a user
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Vote;
};
