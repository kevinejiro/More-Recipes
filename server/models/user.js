
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Username cannot be empty'
      },
      unique: {
        args: true,
        msg: 'Username is already taken, please enter another username'
      },
      validate: {
        len: {
          args: [4, 15],
          msg: 'username must be between the length 4 and 15'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Email cannot be empty'
      },
      unique: {
        args: true,
        msg: 'Email is already taken, please enter another email address'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Password cannot be empty'
      }
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Recipe, { // Associate User with Recipe
      foreignKey: 'userId'
    });
    User.hasMany(models.Favorite, { // Associate User with Favorite
      foreignKey: 'userId',
    });
    User.hasMany(models.Review, { // Associate User with Review
      foreignKey: 'userId',
    });
    User.hasMany(models.Vote, { // Associate User with Vote
      foreignKey: 'userId'
    });
  };
  return User;
};
