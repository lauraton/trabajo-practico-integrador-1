import { Article } from "../models/article.model.js";

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
