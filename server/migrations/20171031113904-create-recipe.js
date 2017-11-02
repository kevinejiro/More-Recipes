
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    imgUrl: {
      type: Sequelize.STRING,
      defaultValue: 'no-img'

    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    ingredients: {
      type: Sequelize.STRING,
      allowNull: false
    },
    direction: {
      type: Sequelize.STRING,
      allowNull: false
    },
    upvoteCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    downvoteCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Recipes')
};
