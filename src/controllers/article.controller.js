import { matchedData } from "express-validator";
import { Article } from "../models/article.model.js";
import { Tag } from "../models/tag.model.js";
import { User } from "../models/user.model.js";

export const createArticle = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });

    const { tags, ...articleData } = validatedData;

    if (!articleData.user_id) {
      articleData.idUser = req.datosDelUsuarioLogeado.user_id;
    }
    const article = await Article.create(articleData);

    if (tags && tags.length > 0) {
      await article.addTags(tags);
    }

    return res
      .status(201)
      .json({ message: "Article creado correctamente", article });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = matchedData(req, { locations: ["body"] });
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article no encontrado" });
    }
    await article.update(validatedData);
    return res
      .status(200)
      .json({ message: "Article actualizado con éxito", article });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Article.findByPk(id);

    if (!deleted) {
      return res.status(404).json({ message: "Article no encontrado." });
    }
    await deleted.destroy();
    return res.status(200).json({ message: "Article eliminado con éxito." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { status: "published" },
      include: [
        { model: User, as: "author", attributes: ["id", "username"] },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getArticlesById = async (req, res) => {
  try {
    const { id } = req.params;
    const articleById = await Article.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
    if (!articleById) {
      return res.status(404).json({ message: "Article no encontrado." });
    }
    return res.status(200).json(articleById);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getArticlesByUser = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: {
        user_id: req.datosDelUsuarioLogeado.idUser,
        status: "published",
      },
      include: [
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getArticleByUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const article = await Article.findOne({
      where: {
        id,
        user_id: req.datosDelUsuarioLogeado.idUser,
      },
      include: [
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!article) {
      return res
        .status(404)
        .json({ message: "No se encontro ese articulo entre los tuyos" });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
