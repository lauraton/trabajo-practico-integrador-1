import { matchedData } from "express-validator";
import { Article } from "../models/article.model.js";

export const createArticle = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        // Creamos una constante donde tomamos las tags de lo que envía el usuario. Al decir "tags", nos referimos al alias de la relación, encontrada en los modelos.
        const { tags } = req.body;
        const article = await Article.create(validatedData)
        // Se establece una condición donde se verifica si tags existe, y se evalúa cuántos valores contiene (como array). Es decir, si tiene más de 0.
        if (tags && tags.length > 0) {
            await article.addTags(tags);
        }

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

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Article.findByPk(id)

        if (!deleted) {
            return res.status(404).json({message: "Article no encontrado."})
        }
        await deleted.destroy()
        return res.status(200).json({message: "Article eliminado con éxito."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor."})
    }
};

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll()
        return res.status(200).json(articles)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
}

export const getArticlesById = async (req, res) => {
    try {
        const {id} = req.params
        const articleById = await Article.findByPk(id)
        if (!articleById) {
            return res.status(404).json({message: "Article no encontrado."})
        }
        return res.status(200).json(articleById)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
}