import express from "express";
import { sequelize, startDB } from "./src/config/database.js";
import { userRoute } from "./src/routes/user.route.js";
import { tagRoute } from "./src/routes/tag.route.js";
import { profileRoute } from "./src/routes/profile.route.js";

const port = 6767;
const app = express();

app.listen(port, async () => {
    await startDB();
    console.log("Servidor ejecutándose en el puerto",port)
})

app.use(express.json());
app.use("/api", userRoute);
app.use("/api", tagRoute)
app.use("/api", profileRoute)