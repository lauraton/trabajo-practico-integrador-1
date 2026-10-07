import { Router } from "express";
import {
  createUserValidation,
  updateUserValidation,
  userIdValidation,
} from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validator.js";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const userRoute = Router();

userRoute.post(
  "/users",
  authMiddleware,
  adminMiddleware,
  createUserValidation,
  validate,
  createUser,
);
userRoute.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidation,
  updateUserValidation,
  validate,
  updateUser,
);
userRoute.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidation,
  validate,
  deleteUser,
);
userRoute.get("/users", authMiddleware, adminMiddleware, getUsers);
userRoute.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidation,
  validate,
  getUserById,
);
