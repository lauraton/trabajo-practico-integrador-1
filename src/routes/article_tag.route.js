import { Router } from "express";
import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/article_tag.controller.js";
import { validate } from "../middlewares/validator.js";
import {
  articleTagIdValidation,
  createArticleTagValidation,
} from "../middlewares/validations/article_tag.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  articleOwnerMiddleware,
  articleTagOwnerMiddleware,
} from "../middlewares/owner.middleware.js";

export const articleTagRouter = Router();

// solo autor
articleTagRouter.post(
  "/articles-tags",
  authMiddleware,
  createArticleTagValidation,
  validate,
  articleOwnerMiddleware,
  createArticleTag,
);
articleTagRouter.delete(
  "/articles-tags/:articleTagId",
  authMiddleware,
  articleTagIdValidation,
  validate,
  articleTagOwnerMiddleware,
  deleteArticleTag,
);
