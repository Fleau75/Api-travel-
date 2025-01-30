import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Trip", {
    destination: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
  });
};
