
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
  });

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Recipe, { // associate favorite with recipe
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Favorite.belongsTo(models.User, { // associate favorite with user
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Favorite;
};
