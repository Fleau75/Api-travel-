import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("User", {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });
};
