module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    body: {
      type: DataTypes.TEXT,
      allowNull: {
        args: true,
        msg: 'please enter a review'
      }
    }
  });
  Review.associate = (models) => { // Associate review with user
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.Recipe, { // Associate review with recipe
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
