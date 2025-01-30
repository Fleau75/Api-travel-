import { Sequelize } from "sequelize";
import UserModel from "./User.js";
import TripModel from "./Trip.js";
import ItemModel from "./Item.js";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = UserModel(sequelize);
const Trip = TripModel(sequelize);
const Item = ItemModel(sequelize);

// Associations
User.hasMany(Trip, { foreignKey: "UserId" });
Trip.belongsTo(User);

Trip.hasMany(Item, { foreignKey: "TripId" });
Item.belongsTo(Trip);

export { sequelize, User, Trip, Item };
