import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";
import { Tag } from "../../models/tag.model.js";
import { Article } from "../../models/article.model.js";

export const articleCreateValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title no puede estar vacío")
    .isString()
    .withMessage("title debe ser un string")
    .isLength({ min: 3, max: 200 })
    .withMessage("title debe tener entre 3 y 200 caracteres"),

  body("content")
    .notEmpty()
    .withMessage("content no puede estar vacío")
    .isString()
    .withMessage("content debe ser un string")
    .isLength({ min: 50 })
    .withMessage("content debe tener 50 o más caracteres"),

  body("excerpt")
    .optional()
    .isString()
    .withMessage("excerpt debe ser un string")
    .isLength({ max: 500 })
    .withMessage("excerpt no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["published", "archived"])
    .withMessage("status debe ser 'published' o 'archived'"),

  body("user_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("user_id debe ser un número entero")
    .custom(async (user_id, { req }) => {
      const userid = await User.findByPk(user_id);

      if (!userid) {
        throw new Error("Ese user_id no existe");
      }

      const { idUser, role } = req.datosDelUsuarioLogeado;
      if (role !== "admin" && Number(user_id) !== idUser) {
        throw new Error("user_id debe coincidir con el usuario logueado");
      }
      return true;
    }),
  body("tags")
    .optional()
    .isArray()
    .withMessage("tags debe ser un array con ids de etiquetas")
    .custom(async (tags) => {
      for (const id of tags) {
        const tag = await Tag.findByPk(id);
        if (!tag) {
          throw new Error(`La etiqueta con id ${id} no existe`);
        }
      }
      return true;
    }),
];

export const articleUpdateValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("title no puede estar vacío")
    .isString()
    .withMessage("title debe ser un string")
    .isLength({ min: 3, max: 200 })
    .withMessage("title debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .notEmpty()
    .withMessage("content no puede estar vacío")
    .isString()
    .withMessage("content debe ser un string")
    .isLength({ min: 50 })
    .withMessage("content debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isString()
    .withMessage("excerpt debe ser un string")
    .isLength({ max: 500 })
    .withMessage("excerpt no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["published", "archived"])
    .withMessage("status debe ser 'published' o 'archived'"),

  body("user_id")
    .optional()
    .notEmpty()
    .withMessage("user_id no puede estar vacío")
    .isInt({ min: 1 })
    .withMessage("user_id debe ser un número entero")
    .custom(async (user_id, { req }) => {
      const userid = await User.findByPk(user_id);

      if (!userid) {
        throw new Error("Ese user_id no existe");
      }
      const { idUser, role } = req.datosDelUsuarioLogeado;
      if (role !== "admin" && Number(user_id) !== idUser) {
        throw new Error("user_id debe coincidir con el usuario logueado");
      }
      return true;
    }),
];

export const articleIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un entero positivo")
    .custom(async (id) => {
      const article = await Article.findByPk(id);

      if (!article) {
        throw new Error("El articulo no existe");
      }

      return true;
    }),
];
export const articleUserIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un entero positivo"),
];
