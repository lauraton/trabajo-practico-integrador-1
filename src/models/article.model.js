import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";

export const Article = sequelize.define("article", {
    title:  {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false},
    excerpt: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('published', 'archived'),
        defaultValue: 'published',
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    timestamps: true
});

Article.belongsTo(User, {foreignKey: "user_id", as: "author"})

User.hasMany(Article, {foreignKey: "user_id", as: "articles"})