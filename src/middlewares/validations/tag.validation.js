import { body, param } from "express-validator";
import { Tag } from "../../models/tag.model.js";
import { Op } from "sequelize";
export const createTagValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name no puede estar vacío")
    .isString()
    .withMessage("Name debe de ser un string")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name debe tener mínimo 2 caracteres, con un máximo de 30")
    .not()
    .contains(" ")
    .withMessage("Name no puede contener espacios")
    .custom(async (name) => {
      const existingTag = await Tag.findOne({ where: { name } });

      if (existingTag) {
        throw new Error("Ya existe ese tag");
      }
      return true;
    }),
];

export const updateTagValidation = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name no puede estar vacío")
    .isString()
    .withMessage("Name debe de ser un string")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name debe tener mínimo 2 caracteres, con un máximo de 30")
    .not()
    .contains(" ")
    .withMessage("Name no puede contener espacios")
    .custom(async (name, { req }) => {
      const existingTag = await Tag.findOne({
        where: {
          name,
          id: { [Op.ne]: req.params.id },
        },
      });

      if (existingTag) {
        throw new Error("Ya existe ese tag");
      }

      return true;
    }),
];

export const tagIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un entero positivo")
    .custom(async (id) => {
      const tag = await Tag.findByPk(id);

      if (!tag) {
        throw new Error("El tag no existe");
      }

      return true;
    }),
];
