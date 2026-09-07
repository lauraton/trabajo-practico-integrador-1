import { matchedData } from "express-validator";
import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        const user = await User.create(validatedData)
        return res.status(201).json({message: "Usuario creado correctamente", user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
};

export const updateUser = async (req, res) => {
    try {
        const validatedData = matchedData(req);
        const { id } = req.params;
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({message: "Usuario no encontrado."})
        }

        await user.update(validatedData)

        return res.status(200).json({message: "Usuario actualizado correctamente.", user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const buscarUser = await User.findByPk(id);

        if (!buscarUser) {
            return res.status(404).json({message: "Usuario no encontrado."});
        }

        await buscarUser.destroy()

        return res.status(200).json({message: "Usuario eliminado exitosamente"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor"})
    }
}