import { body } from "express-validator";

export const updateProfileValidation = [
  body("first_name")
    .optional()
    .notEmpty()
    .withMessage("first_name no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage("first_name debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("first_name solo puede contener letras"),

  body("last_name")
    .optional()
    .notEmpty()
    .withMessage("last_name no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage("last_name debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("last_name solo puede contener letras"),

  body("biography")
    .optional()
    .isString()
    .withMessage("biography debe ser un string")
    .isLength({ max: 500 })
    .withMessage("biography no puede superar los 500 caracteres"),

  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("avatar_url debe ser una URL")
    .isLength({ max: 255 })
    .withMessage("avatar_url no puede superar los 255 caracteres"),

  body("birth_date")
    .optional()
    .isDate()
    .withMessage("birth_date debe ser una fecha YYYY-MM-DD"),
];
