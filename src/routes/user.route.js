import { Router } from "express";
import { createUserValidation, userIdValidation } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validator.js";
import { createUser } from "../controllers/user.controller.js";

export const userRoute = Router();

userRoute.post("/users", createUserValidation, validate, createUser)