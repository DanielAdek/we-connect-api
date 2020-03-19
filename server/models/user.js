import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'username already in use by another user'
      },
      validate: {
        is: {
          args: ['^[a-zA-Z]+$', 'i'],
          msg: 'username can only contain letters'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email is already in use by another user'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Businesses, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  User.beforeValidate((user) => {
    user.password = bcrypt.hashSync(user.password, 8);
  });

  User.comparePassword = (password, self) => bcrypt.compareSync(password, self.password);
  return User;
};
