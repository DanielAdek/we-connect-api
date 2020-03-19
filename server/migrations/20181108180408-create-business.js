module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    businessName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    businessLocation: {
      type: Sequelize.STRING
    },
    contactNumber: {
      type: Sequelize.STRING
    },
    businessImage: {
      type: Sequelize.STRING
    },
    trashed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  down: (queryInterface) => queryInterface.dropTable('Businesses')
};
