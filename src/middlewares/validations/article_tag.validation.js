import { body, param } from "express-validator";
import { Article } from "../../models/article.model.js";
import { Tag } from "../../models/tag.model.js";
import { ArticleTag } from "../../models/article_tag.model.js";

export const createArticleTagValidation = [
  body("article_id")
    .notEmpty()
    .withMessage("article_id no puede estar vacío")
    .isInt({ min: 1 })
    .withMessage("article_id debe ser un número entero")
    .custom(async (article_id) => {
      const article = await Article.findByPk(article_id);

      if (!article) {
        throw new Error("El articulo no existe");
      }
      return true;
    }),

  body("tag_id")
    .notEmpty()
    .withMessage("tag_id no puede estar vacío")
    .isInt({ min: 1 })
    .withMessage("tag_id debe ser un número entero")
    .custom(async (tag_id, { req }) => {
      const tag = await Tag.findByPk(tag_id);

      if (!tag) {
        throw new Error("La etiqueta no existe");
      }

      const relationExist = await ArticleTag.findOne({
        where: { article_id: req.body.article_id, tag_id },
      });

      if (relationExist) {
        throw new Error("El articulo ya tiene esa etiqueta");
      }
      return true;
    }),
];

export const articleTagIdValidation = [
  param("articleTagId")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un entero positivo")
    .custom(async (articleTagId) => {
      const articleTag = await ArticleTag.findByPk(articleTagId);

      if (!articleTag) {
        throw new Error("La relacion no existe");
      }

      return true;
    }),
];
