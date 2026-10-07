import { Router } from "express";
import {
  createTagValidation,
  updateTagValidation,
} from "../middlewares/validations/tag.validation.js";
import { validate } from "../middlewares/validator.js";
import {
  createTag,
  deleteTag,
  getTags,
  getTagsById,
  updateTag,
} from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const tagRoute = Router();

tagRoute.post(
  "/tags",
  authMiddleware,
  adminMiddleware,
  createTagValidation,
  validate,
  createTag,
);
tagRoute.put(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidation,
  validate,
  updateTag,
);
tagRoute.delete(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  validate,
  deleteTag,
);
tagRoute.get("/tags", authMiddleware, getTags);
tagRoute.get(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  validate,
  getTagsById,
);
