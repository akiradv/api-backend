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

// STATUS REAL DA API
app.get("/status", (req, res) => {
  res.json({
    status: "online",
    uptime: process.uptime(),
    memory: process.memoryUsage().rss,
    timestamp: Date.now()
  });
});

// HOME BONITA E DINÂMICA
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Akira Core API</title>
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
        background: rgba(255,255,255,0.06);
        backdrop-filter: blur(12px);
        border-radius: 18px;
        padding: 28px;
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 0 40px rgba(0,0,0,0.4);
      }

      h1 {
        font-size: 28px;
        margin-bottom: 10px;
      }

      .badge {
        display: inline-block;
        background: #22c55e;
        color: black;
        padding: 5px 12px;
        border-radius: 999px;
        font-weight: bold;
        font-size: 12px;
      }

      code {
        background: rgba(255,255,255,0.08);
        padding: 8px 12px;
        border-radius: 10px;
        display: block;
        margin: 8px 0;
      }

      .footer {
        margin-top: 20px;
        opacity: 0.6;
        font-size: 14px;
      }

      .status {
        margin-top: 12px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <span class="badge">ONLINE</span>
      <h1>🚀 Akira Core API</h1>
      <p>Backend oficial da plataforma AkiraDev.</p>

      <div class="status" id="status">Carregando status...</div>

      <h3>📌 Endpoints:</h3>
      <code>POST /auth/register</code>
      <code>POST /auth/login</code>
      <code>GET /posts</code>
      <code>POST /posts</code>
      <code>GET /status</code>

      <h3>🧠 Stack:</h3>
      <p>Node.js • Express • SQLite • JWT • Render</p>

      <div class="footer">
        Desenvolvido por <strong>AkiraDev</strong> — ${new Date().getFullYear()}
      </div>
    </div>

    <script>
      async function loadStatus() {
        try {
          const res = await fetch("/status");
          const data = await res.json();

          const uptime = Math.floor(data.uptime);
          const memoryMB = Math.round(data.memory / 1024 / 1024);

          document.getElementById("status").innerText =
            "🟢 ONLINE • Uptime: " + uptime + "s • RAM: " + memoryMB + "MB";
        } catch {
          document.getElementById("status").innerText = "🔴 OFFLINE";
        }
      }

      loadStatus();
      setInterval(loadStatus, 3000);
    </script>
  </body>
  </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API rodando na porta " + PORT);
});
