import { body } from "express-validator";
import { createUserValidation } from "./user.validation.js";

export const registerValidation = createUserValidation;

export const loginValidation = [
  body("username").notEmpty().withMessage("El username no debe ser vacio"),
  body("password").notEmpty().withMessage("La password no debe ser vacia"),
];
