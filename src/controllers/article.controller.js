import { matchedData } from "express-validator";
import { Article } from "../models/article.model.js";

export const createArticle = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        const article = await Article.create(validatedData)
        return res.status(201).json({message: "Article creado correctamente", article})
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
   };

export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = matchedData(req);
        const article = await Article.findByPk(id)

        if (!article) {
            return res.status(404).json({message: "Article no encontrado"})
        }
        await article.update(validatedData);
        return res.status(200).json({message: "Article actualizado con éxito", article})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor"})
    }
};