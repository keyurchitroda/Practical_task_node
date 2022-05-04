module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
      },
      role: {
        type: Sequelize.ENUM("admin", "manager", "user"),
        defaultValue: "user",
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return User;
};
