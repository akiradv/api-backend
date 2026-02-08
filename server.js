import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({ status: "API rodando 🚀" });
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
