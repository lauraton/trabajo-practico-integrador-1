import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"
import { User } from "./user.model.js"

export const Profile = sequelize.define("profile", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },

    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    biography: {
        type: DataTypes.STRING(200),
        allowNull: true
    },

    avatar_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    birth_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

Profile.belongsTo(User, {foreignKey: "user_id", as: "user"})

User.hasOne(Profile, {foreignKey: "user_id", as: "profile"})