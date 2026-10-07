import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Article } from "./article.model.js";
import { Tag } from "./tag.model.js";

export const ArticleTag = sequelize.define(
  "Article_Tag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "articles",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  },
);

Article.belongsToMany(Tag, {
  through: ArticleTag,
  foreignKey: "article_id",
  as: "tags",
  onDelete: "CASCADE",
});

Tag.belongsToMany(Article, {
  through: ArticleTag,
  foreignKey: "tag_id",
  as: "articles",
});
ArticleTag.belongsTo(Article, { foreignKey: "article_id", as: "article" });
