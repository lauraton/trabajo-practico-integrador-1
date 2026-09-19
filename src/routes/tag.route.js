import { Router } from "express";
import { createTagValidation, tagIdValidation, updateTagValidation } from "../middlewares/validations/tag.validation.js";
import { validate } from "../middlewares/validator.js";
import { createTag, deleteTag, getTags, getTagsById, updateTag } from "../controllers/tag.controller.js";

export const tagRoute = Router()

tagRoute.post("/tags", createTagValidation, validate, createTag)
tagRoute.put("/tags/:id", updateTagValidation, validate, updateTag)
tagRoute.delete("/tags/:id", deleteTag)
tagRoute.get("/tags", getTags)
tagRoute.get("/tags/:id", getTagsById)