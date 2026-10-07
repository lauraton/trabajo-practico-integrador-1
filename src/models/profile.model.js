import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";

export const Profile = sequelize.define("profile", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
  },

  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  avatar_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
{
    timestamps: true
});

Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasOne(Profile, { foreignKey: "user_id", as: "profile", onDelete: "CASCADE" });
