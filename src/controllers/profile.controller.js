import { matchedData } from "express-validator";
import { Profile } from "../models/profile.model.js";

export const createProfile = async (req, res) => {
    try {
        const validatedData = matchedData(req)
        const profile = await Profile.create(validatedData)
        return res.status(201).json({message: "Profile creado exitosamente", profile})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        const { id } = req.params;

        const profile = await Profile.findByPk(id)
        if (!profile) {
            return res.status(404).json({message: "No existe ese profile"})
        }
    
        await profile.update(validatedData)
        return res.status(200).json({message: "Profile actualizado correctamente", profile})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = Profile.findByPk(id)
        if (!deleted) {
            return res.status(404).json({message: "Profile no encontrado"})
        }
        await deleted.destroy()
        return res.status(200).json({message: "Profile eliminado con éxito."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
    
}

export const getProfiles = async (req, res) => {
    try {
        const getAll = Profile.findAll()
        return res.status(200).json(getAll)
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor"})
    }
    
};

export const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const getById = Profile.findByPk(id)
        if (!getById) {
            return res.status(404).json({message: ""})
        }
        return res.status(200).json(getById)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
}

