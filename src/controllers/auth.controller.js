import { matchedData } from "express-validator";
import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
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
    } = matchedData(req, { locations: ["body"] });

    const hashedPassword = await hashPassword(password);

    // role es opcional, se acepta para poder crear un admin de prueba
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // creacion automatica del perfil
    await Profile.create({
      user_id: newUser.id,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
    });

    return res.status(201).json({
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = matchedData(req, { locations: ["body"] });

    const userExist = await User.findOne({
      where: {
        username,
      },
    });

    if (!userExist) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }

    const validPassword = await comparePassword(password, userExist.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }

    const token = generateToken({ idUser: userExist.id, role: userExist.role });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      message: "Usuario logueado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.datosDelUsuarioLogeado.idUser, {
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

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });

    const profileExist = await Profile.findOne({
      where: {
        user_id: req.datosDelUsuarioLogeado.idUser,
      },
    });

    if (!profileExist) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }

    await profileExist.update(validatedData);

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      profile: profileExist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
