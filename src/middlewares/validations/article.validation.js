import { body } from "express-validator";
import { Article } from "../../models/article.model.js";
import { User } from "../../models/user.model.js";

export const articleCreateValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("title no puede estar vacío")
        .isString()
        .withMessage("title debe ser un string")
        .isLength({min: 3 , max: 200}),

    body("content")
        .notEmpty()
        .withMessage("content no puede estar vacío")
        .isString()
        .withMessage("content debe ser un string")
        .isLength({ min: 50}),
    
    body("excerpt")
        .optional()
        .isString()
        .withMessage("excerpt debe ser un string")
        .isLength({max: 500}),

    body("status")
        .optional()
        .trim()
        .isIn(["published", "archived"]).toLowerCase()
        .withMessage("status debe ser 'published' o 'archived'"),

    body("user_id")
        .notEmpty()
        .withMessage("user_id no puede estar vacío")
        .isInt({min: 1})
        .withMessage("user_id debe ser un número entero")
        .custom(async (user_id) => {
            const userid = await User.findByPk(user_id)

            if (!userid) {
                throw new Error({message: "Ese user_id no existe"})
            }
            return true;
        })

];