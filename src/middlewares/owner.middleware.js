import { Article } from "../models/article.model.js";
import { ArticleTag } from "../models/article_tag.model.js";

export const ownerMiddleware = async (req, res, next) => {
  try {
    const { user_id, role } = req.datosDelUsuarioLogeado;

    const articleExist = await Article.findByPk(req.params.id);

    if (!articleExist) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    if (articleExist.user_id !== user_id && role !== "admin") {
      return res.status(403).json({
        message: "Solo el autor o un admin pueden modificar el articulo",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const articleOwnerMiddleware = async (req, res, next) => {
  try {
    const { user_id } = req.datosDelUsuarioLogeado;

    const articleExist = await Article.findByPk(req.body.article_id);

    if (!articleExist) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    if (articleExist.user_id !== user_id) {
      return res.status(403).json({
        message: "Solo el autor puede agregar etiquetas a su articulo",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const articleTagOwnerMiddleware = async (req, res, next) => {
  try {
    const { user_id } = req.datosDelUsuarioLogeado;

    const articleTagExist = await ArticleTag.findByPk(req.params.articleTagId, {
      include: [{ model: Article, as: "article" }],
    });

    if (!articleTagExist) {
      return res.status(404).json({ message: "Relacion no encontrada" });
    }

    if (articleTagExist.article.user_id !== user_id) {
      return res.status(403).json({
        message: "Solo el autor puede quitar etiquetas de su articulo",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
