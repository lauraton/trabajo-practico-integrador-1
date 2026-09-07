import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Article = sequelize.define("article", {
    title:  {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false},
    excerpt: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('published', 'archived'),
        default: 'published',
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
},
{
    timestaps: true
});