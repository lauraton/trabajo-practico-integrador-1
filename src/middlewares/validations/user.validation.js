import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";

export const createUserValidation = [
    body("username")
        .notEmpty()
        .withMessage("Username no puede estar vacío")
        .isString()
        .withMessage("El username debe ser un string")
        .isLength( { min: 3, max: 20 })
        .withMessage("Username debe contener al menos 3 caracteres, con un máximo de 20")
        .custom(async (username) => {
            const existingUsername = await User.findOne({
                where: {username}
            });
            if (existingUsername) {
                throw new Error("El username ya está en uso.")
            }
            return true;
        }),
    body("email")
        .notEmpty()
        .withMessage("Email no puede estar vacío")
        .isEmail()
        .withMessage("Email debe tener un formato válido")
        .isLength({ max: 100 })
        .withMessage("Email no debe superar los 100 caracteres")
        .custom(async (email) => {
            const existingEmail = await User.findOne({ where: {email}});
            if (existingEmail) {
                throw new Error("Ese email ya está registrado")
            }
            return true;
        }),
    body("password")
        .notEmpty()
        .withMessage("Password no puede estar vacío")
        .isString()
        .withMessage("Password debe ser un string"),
    body("role")
        .optional()
        .custom(async (role) => {
            const lower = role.trim().toLowerCase()
            if (lower !== "admin" && lower !== "user") {
                throw new Error("El role debe ser entre 'user' o 'admin'")
            }
            return true;
        })

];

export const updateUserValidation = [
    body("username")
        .optional()
        .notEmpty()
        .withMessage("Username no puede estar vacío")
        .isString()
        .withMessage("El username debe ser un string")
        .isLength( { min: 3, max: 20 })
        .withMessage("Username debe contener al menos 3 caracteres, con un máximo de 20")
        .custom(async (username) => {
            const existingUsername = await User.findOne({
                where: {username}
            });
            if (existingUsername) {
                throw new Error("El username ya está en uso.")
            }
            return true;
        }),
    
    body("email")
        .optional()
        .notEmpty()
        .withMessage("Email no puede estar vacío")
        .isEmail()
        .withMessage("Email debe tener un formato válido")
        .isLength({ max: 100 })
        .withMessage("Email no debe superar los 100 caracteres")
        .custom(async (email) => {
            const existingEmail = await User.findOne({ where: {email}});
            if (existingEmail) {
                throw new Error("Ese email ya está registrado")
            }
            return true;
        }),
    
    body("password")
        .optional()
        .notEmpty()
        .withMessage("Password no puede estar vacío")
        .isString()
        .withMessage("Password debe ser un string"),

     body("role")
        .optional()
        .custom(async (role) => {
            const lower = role.trim().toLowerCase();
            if (lower !== "admin" && lower !== "user") {
                throw new Error("El role debe ser entre 'user' o 'admin'")
            }
            return true;
        })
]

export const userIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo")
        .custom(async (id) => {
            const user = await User.findByPk(id);

            if (!user) {
                throw new Error("El usuario no existe");
            }

            return true;
        })
];