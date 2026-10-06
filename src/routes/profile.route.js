import { Router } from "express";
import { createProfileValidation, profileIdValidation, updateProfileValidation } from "../middlewares/validations/profile.validation.js";
import { validate } from "../middlewares/validator.js";
import { createProfile, deleteProfile, getProfileById, getProfiles, updateProfile } from "../controllers/profile.controller.js";


export const profileRoute = Router()

profileRoute.post("/profiles", createProfileValidation, validate, createProfile)
profileRoute.put("/profiles/:id",  profileIdValidation, updateProfileValidation, validate, updateProfile)
profileRoute.delete("/profiles/:id", deleteProfile)
profileRoute.get("/profiles", getProfiles)
profileRoute.get("/profiles/:id", getProfileById)