import { Router } from "express"
import { articleCreateValidation, articleUpdateValidation } from "../middlewares/validations/article.validation.js"
import { validate } from "../middlewares/validator.js"
import { createArticle, updateArticle } from "../controllers/article.controller.js"


export const articleRoute = Router()

articleRoute.post("/articles", articleCreateValidation, validate, createArticle)
articleRoute.put("/articles/:id", articleUpdateValidation, validate, updateArticle)