const businessModel = (sequelize, DataTypes) => {
  const Business = sequelize.define('Businesses', {
    businessName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    businessImage: {
      type: DataTypes.STRING,
    },
    businessLocation: {
      type: DataTypes.STRING,
    },
    trashed: {
      type: DataTypes.BOOLEAN
    },
    contactNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Telephone Number is required'
        }
      }
    },
  });
  Business.associate = (models) => {
    // associations can be defined here
    Business.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Business;
};

export default businessModel;
