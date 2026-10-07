import { matchedData } from "express-validator";
import { User } from "../models/user.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";
import { Profile } from "../models/profile.model.js";
import { Article } from "../models/article.model.js";

export const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
    } = matchedData(req, {
      locations: ["body"],
    });
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await Profile.create({
      user_id: user.id,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
    });
    return res
      .status(201)
      .json({ message: "Usuario creado correctamente", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    if (validatedData.password) {
      validatedData.password = await hashPassword(validatedData.password);
    }
    await user.update(validatedData);

    return res
      .status(200)
      .json({ message: "Usuario actualizado correctamente.", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const buscarUser = await User.findByPk(id);

    if (!buscarUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    await buscarUser.destroy();

    return res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const getAll = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Profile,
          as: "profile",
        },
      ],
    });
    return res.status(200).json(getAll);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const getById = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Profile, as: "profile" },
        { model: Article, as: "articles" },
      ],
    });
    if (!getById) {
      return res.status(404).json({ message: "User no encontrado" });
    }
    return res.status(200).json(getById);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
