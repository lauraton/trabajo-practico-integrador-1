import { matchedData } from "express-validator";
import { ArticleTag } from "../models/article_tag.model.js";

export const createArticleTag = async (req, res) => {
  try {
    const { article_id, tag_id } = matchedData(req, { locations: ["body"] });

    const articleTag = await ArticleTag.create({ article_id, tag_id });

    return res
      .status(201)
      .json({ message: "Etiqueta agregada al articulo", articleTag });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteArticleTag = async (req, res) => {
  try {
    const { articleTagId } = matchedData(req, { locations: ["params"] });

    const articleTagExist = await ArticleTag.findByPk(articleTagId);

    if (!articleTagExist) {
      return res.status(404).json({ message: "Relacion no encontrada" });
    }

    await articleTagExist.destroy();

    return res
      .status(200)
      .json({ message: "Etiqueta eliminada del articulo correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
