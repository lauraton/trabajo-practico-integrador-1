import { Router } from "express";
import {
  articleCreateValidation,
  articleIdValidation,
  articleUpdateValidation,
  articleUserIdValidation,
} from "../middlewares/validations/article.validation.js";
import { validate } from "../middlewares/validator.js";
import {
  createArticle,
  deleteArticle,
  getArticles,
  getArticlesById,
  getArticleByUser,
  updateArticle,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
export const articleRoute = Router();

articleRoute.post(
  "/articles",
  authMiddleware,
  articleCreateValidation,
  validate,
  createArticle,
);
articleRoute.put(
  "/articles/:id",
  authMiddleware,
  articleIdValidation,
  articleUpdateValidation,
  validate,
  ownerMiddleware,
  updateArticle,
);
articleRoute.delete(
  "/articles/:id",
  authMiddleware,
  articleIdValidation,
  validate,
  ownerMiddleware,
  deleteArticle,
);
articleRoute.get("/articles", authMiddleware, getArticles);
articleRoute.get("/articles/user", authMiddleware, getArticlesByUser);
articleRoute.get(
  "/articles/user/:id",
  authMiddleware,
  articleUserIdValidation,
  validate,
  getArticlesByUser,
);
articleRoute.get(
  "/articles/:id",
  authMiddleware,
  articleIdValidation,
  validate,
  getArticlesById,
);
