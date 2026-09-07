import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"

export const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false
    }
},
{
    timestamps: true,
    paranoid: true
    
})