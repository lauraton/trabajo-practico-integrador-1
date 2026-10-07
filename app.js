import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { startDB } from "./src/config/database.js";
import { userRoute } from "./src/routes/user.route.js";
import { tagRoute } from "./src/routes/tag.route.js";
import { articleRoute } from "./src/routes/article.route.js";
import { ArticleTag } from "./src/models/article_tag.model.js";
import { Profile } from "./src/models/profile.model.js";
import { authRouter } from "./src/routes/auth.route.js";
import { articleTagRouter } from "./src/routes/article_tag.route.js";
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api", userRoute);
app.use("/api", tagRoute);
app.use("/api", articleRoute);
app.use("/api", articleTagRouter);

app.listen(port, async () => {
  await startDB();
  console.log("Servidor ejecutándose en el puerto", port);
});
