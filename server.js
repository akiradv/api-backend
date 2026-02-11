import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Akira API</title>
    <style>
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: radial-gradient(circle at top, #111 0%, #000 70%);
        color: white;
        padding: 40px;
      }

      .card {
        max-width: 900px;
        margin: auto;
        background: rgba(255,255,255,0.05);
        backdrop-filter: blur(12px);
        border-radius: 16px;
        padding: 24px;
        border: 1px solid rgba(255,255,255,0.1);
      }

      h1 {
        font-size: 28px;
        margin-bottom: 10px;
      }

      .badge {
        display: inline-block;
        background: #22c55e;
        color: black;
        padding: 4px 10px;
        border-radius: 999px;
        font-weight: bold;
        font-size: 12px;
      }

      code {
        background: rgba(255,255,255,0.08);
        padding: 6px 10px;
        border-radius: 8px;
        display: block;
        margin: 6px 0;
      }

      .footer {
        margin-top: 20px;
        opacity: 0.6;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <span class="badge">ONLINE</span>
      <h1>🚀 Akira API Backend</h1>
      <p>Status: API rodando perfeitamente.</p>

      <h3>📌 Endpoints disponíveis:</h3>

      <code>POST /auth/register</code>
      <code>POST /auth/login</code>
      <code>GET /posts</code>
      <code>POST /posts</code>

      <h3>🧠 Tecnologias:</h3>
      <p>Node.js • Express • SQLite • JWT • Render</p>

      <div class="footer">
        Desenvolvido por <strong>AkiraDev</strong> — ${new Date().getFullYear()}
      </div>
    </div>
  </body>
  </html>
  `);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API rodando na porta " + PORT);
});
