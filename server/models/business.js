export default (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Business name already taken'
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    categories: {
      type: DataTypes.STRING,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Telephone Number is required'
        },
        isInt: {
          msg: 'Enter a valid Telephone Number'
        },
        len: {
          args: [7, 11],
          msg: 'Telephone Number should be 7 to 11 characters'
        },
      }
    },
  });
  Business.associate = (models) => {
    // associations can be defined here
  };
  return Business;
};