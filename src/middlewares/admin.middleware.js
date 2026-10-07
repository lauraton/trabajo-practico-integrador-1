export const adminMiddleware = (req, res, next) => {
  try {
    if (req.datosDelUsuarioLogeado.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acceso denegado, solo para administradores" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
