import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Item", {
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
};
