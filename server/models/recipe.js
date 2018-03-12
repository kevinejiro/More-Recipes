module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Title is required'
      },
      validate: {
        notEmpty: {
          args: false,
          msg: 'Title is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
    },

    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true

    },

    ingredients: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Ingredients are required'
      },
      validate: {
        notEmpty: {
          args: false,
          msg: 'Ingredient is required'
        }
      },
    },

    direction: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'direction is required'
      },
      validate: {
        notEmpty: {
          args: false,
          msg: 'direction is required'
        }
      }
    },

    upvoteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    downvoteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }

  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, { // Associate recipes with User;
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Vote, { // Associate recipes with votes;
      foreignKey: 'recipeId',
      as: 'votes'
    });
    Recipe.hasMany(models.Review, { // Associate recipe with reviews
      foreignKey: 'recipeId',
      as: 'reviews'
    });
  };

  return Recipe;
};
