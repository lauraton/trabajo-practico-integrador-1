import jwt from "jsonwebtoken";

export const generateToker = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error generando el token");
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw new Error("Error verificando el token");
  }
};
