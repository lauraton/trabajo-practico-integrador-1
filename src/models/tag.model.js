import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Tag = sequelize.define(
  "tag",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
  },

  { timestamps: true },
);
