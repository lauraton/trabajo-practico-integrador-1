import { Router } from "express";
import { createTagValidation, tagIdValidation, updateTagValidation } from "../middlewares/validations/tag.validation.js";
import { validate } from "../middlewares/validator.js";
import { createTag, updateTag } from "../controllers/tag.controller.js";

export const tagRoute = Router()

tagRoute.post("/tags", createTagValidation, validate, createTag)
tagRoute.put("/tags/:id", tagIdValidation, updateTagValidation, validate, updateTag)