import { body, param } from "express-validator";
import { Profile } from "../../models/profile.model.js"

export const createProfileValidation = [
    body("user_id")
        .notEmpty()
        .withMessage("user_id no puede estar vacío")
        .isInt()
        .withMessage("user_id debe de ser un número entero")
        .custom(async (user_id) => {
            const existingUserID = await Profile.findByPk(user_id)

            if (existingUserID) {
                throw new Error("user_id ingresado ya está en uso")
            }
            return true;
        }),

    body("first_name") 
        .notEmpty()
        .withMessage("first_name no puede estar vacío")
        .isString()
        .withMessage("first_name debe ser un string")
        .isLength({max: 50})
        .withMessage("first_name no puede superar los 50 caracteres"),

    body("last_name") 
        .optional()
        .notEmpty()
        .withMessage("last_name no puede estar vacío")
        .isString()
        .withMessage("last_name debe ser un string")
        .isLength({max: 50})
        .withMessage("last_name no puede superar los 50 caracteres"),
    
    body("biography")
        .optional()
        .isString()
        .withMessage("biography debe ser un string")
        .isLength({max: 200})
        .withMessage("biography no puede superar los 200 caracteres"),
    
    body("avatar_url")
        .optional()
        .isURL()
        .withMessage("avatar_url debe ser una URL")
        .isLength( {max: 255} )
        .withMessage("avatar_url no puede superar los 255 caracteres"),
        
    body("birth_date")
        .notEmpty()
        .withMessage("birth_date no puede estar vacío")
        .isDate()
        .withMessage("birth_date debe ser una fecha YYYY/MM/DD"),
];

export const updateProfileValidation = [
    body("user_id")
        .notEmpty()
        .withMessage("user_id no puede estar vacío")
        .isInt()
        .withMessage("user_id debe de ser un número entero")
        .custom(async (user_id) => {
            const existingUserID = await Profile.findByPk(user_id)

            if (existingUserID) {
                throw new Error("user_id ingresado ya está en uso")
            }
            return true;
        }),

    body("first_name") 
        .optional()
        .notEmpty()
        .withMessage("first_name no puede estar vacío")
        .isString()
        .withMessage("first_name debe ser un string")
        .isLength({max: 50})
        .withMessage("first_name no puede superar los 50 caracteres"),

    body("last_name") 
        .optional()
        .notEmpty()
        .withMessage("last_name no puede estar vacío")
        .isString()
        .withMessage("last_name debe ser un string")
        .isLength({max: 50})
        .withMessage("last_name no puede superar los 50 caracteres"),
    
    body("biography")
        .optional()
        .isString()
        .withMessage("biography debe ser un string")
        .isLength({max: 200})
        .withMessage("biography no puede superar los 200 caracteres"),
    
    body("avatar_url")
        .optional()
        .isURL()
        .withMessage("avatar_url debe ser una URL")
        .isLength( {max: 255} )
        .withMessage("avatar_url no puede superar los 255 caracteres"),
        
    body("birth_date")
        .optional()
        .notEmpty()
        .withMessage("birth_date no puede estar vacío")
        .isDate()
        .withMessage("birth_date debe ser una fecha YYYY/MM/DD"),
];

export const profileIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo")
        .custom(async (id) => {
            const profile = await Profile.findByPk(id);

            if (!profile) {
                throw new Error("El perfil no existe");
            }

            return true;
        })
];