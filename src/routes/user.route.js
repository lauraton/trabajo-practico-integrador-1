import { Router } from "express";
import { createUserValidation, updateUserValidation, userIdValidation } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validator.js";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";

export const userRoute = Router();

userRoute.post("/users", createUserValidation, validate, createUser)
userRoute.put("/users/:id", userIdValidation, updateUserValidation, validate, updateUser)
userRoute.delete("/users/:id", userIdValidation, validate, deleteUser)
userRoute.get("/users", getUsers)
userRoute.get("/users/:id", getUserById)