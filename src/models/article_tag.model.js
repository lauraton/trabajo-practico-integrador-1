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
        }
    }
);

Article.belongsToMany(Tag, {through: ArticleTag, foreignKey: "article_id", as: "tags"})

Tag.belongsToMany(Article, {through: ArticleTag, foreignKey: "tag_id", as: "articles"})