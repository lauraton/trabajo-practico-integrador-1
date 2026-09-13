import { Router } from "express";
import { createProfileValidation, profileIdValidation, updateProfileValidation } from "../middlewares/validations/profile.validation.js";
import { validate } from "../middlewares/validator.js";
import { createProfile } from "../controllers/profile.controller.js";


export const profileRoute = Router()

profileRoute.post("/profiles", createProfileValidation, validate, createProfile)
profileRoute.put("/profiles",  profileIdValidation, updateProfileValidation, validate, createProfile)