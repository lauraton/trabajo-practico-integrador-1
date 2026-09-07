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
   
    const { id } = req.params;
    const validatedData = matchedData(req);
    const tag = await Tag.findByPk(id)

    if (!tag) {
        return res.status(404).json({message: "Ese tag no existe"});


    }

    await tag.update(validatedData)
} catch (error) {
    console.log(error)
    return res.status(500).json({message: "Error interno del servidor"})
}
}