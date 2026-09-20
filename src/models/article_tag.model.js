import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Article } from "./article.model.js";
import { Tag } from "./tag.model.js"

export const ArticleTag = sequelize.define("Article_Tag",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

Article.belongsToMany(Tag, {through: ArticleTag, foreignKey: "article_id", as: "tags", onDelete: "CASCADE"})

Tag.belongsToMany(Article, {through: ArticleTag, foreignKey: "tag_id", as: "articles"})