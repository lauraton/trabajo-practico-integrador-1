import { matchedData } from "express-validator";
import { Tag } from "../models/tag.model.js";

export const createTag = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        const tag = await Tag.create(validatedData)
        return res.status(201).json({message: "Tag creado exitosamente", tag})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const updateTag = async (req, res) => {
try {
    const validatedData = matchedData(req);
    const { id } = req.params;

    const tag = await Tag.findByPk(id)

    if (!tag) {
        return res.status(401).json({message: "No existe ese id"})
    }

    await tag.update(validatedData)
    return res.status(201).json({message: "Tag actualizado correctamente"})
} catch (error) {
    console.log(error)
    return res.status(500).json({message: "Error interno del servidor"})
}
};

export const deleteTag = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Tag.findByPk(id)
        if (!deleted) {
            return res.status(404).json({message: "Tag no encontrado"})

        }
        await deleted.destroy()
        return res.status(200).json({message: "Tag eliminado con éxito"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const getTags = async (req, res) => {
    try {
        const getAll = await Tag.findAll()
        return res.status(200).json(getAll)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
}

export const getTagsById = async (req, res) => {
    try {
        const { id} = req.params
        const getById = await Tag.findByPk(id)
        if (!getById) {
            return res.status(404).json({message: "Tag no encontrado"})
        }
        return res.status(200).json(getById)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
}