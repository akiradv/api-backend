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

// Docs
app.get("/docs", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Akira Core API — Docs</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, Segoe UI, sans-serif;
  background: #0b0b0f;
  color: #e5e7eb;
}

.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: #0f0f16;
  border-right: 1px solid rgba(255,255,255,0.08);
  padding: 24px;
}

.logo {
  font-weight: 900;
  font-size: 18px;
  margin-bottom: 20px;
}

.sidebar a {
  display: block;
  color: #9ca3af;
  text-decoration: none;
  margin: 8px 0;
  padding: 8px;
  border-radius: 8px;
}

.sidebar a:hover {
  background: rgba(255,255,255,0.05);
  color: white;
}

.main {
  padding: 40px;
}

.badge {
  display: inline-block;
  background: #22c55e;
  color: black;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: bold;
}

.card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 20px;
  margin: 18px 0;
}

.endpoint {
  background: rgba(255,255,255,0.08);
  padding: 12px;
  border-radius: 10px;
  font-family: monospace;
  font-size: 14px;
  margin-top: 8px;
}

.method {
  font-weight: bold;
  margin-right: 6px;
}

.get { color: #38bdf8; }
.post { color: #22c55e; }

button {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: rgba(255,255,255,0.15);
}

.footer {
  margin-top: 40px;
  opacity: 0.6;
  font-size: 14px;
}
</style>
</head>

<body>

<div class="layout">

<!-- SIDEBAR -->
<div class="sidebar">
  <div class="logo">🚀 Akira Core API</div>
  <a href="#intro">Introdução</a>
  <a href="#auth">Autenticação</a>
  <a href="#posts">Posts</a>
  <a href="#status">Status</a>
</div>

<!-- MAIN -->
<div class="main">

<section id="intro">
  <span class="badge">ONLINE</span>
  <h1>Akira Core API — Documentação</h1>
  <p>API moderna para autenticação e posts. Construída por AkiraDev.</p>

  <div class="card">
    <strong>Base URL</strong>
    <div class="endpoint">${req.protocol}://${req.get("host")}</div>
  </div>
</section>

<section id="auth">
  <h2>🔐 Autenticação</h2>

  <div class="card">
    <strong>Registrar</strong>
    <div class="endpoint"><span class="method post">POST</span> /auth/register</div>
    <div class="endpoint">Body: { "username": "user", "password": "1234" }</div>
  </div>

  <div class="card">
    <strong>Login</strong>
    <div class="endpoint"><span class="method post">POST</span> /auth/login</div>
    <div class="endpoint">Resposta: { "token": "JWT_TOKEN" }</div>
  </div>
</section>

<section id="posts">
  <h2>📝 Posts</h2>

  <div class="card">
    <strong>Listar posts</strong>
    <div class="endpoint"><span class="method get">GET</span> /posts</div>
  </div>

  <div class="card">
    <strong>Criar post</strong>
    <div class="endpoint"><span class="method post">POST</span> /posts</div>
    <div class="endpoint">Headers: Authorization: Bearer TOKEN</div>
    <div class="endpoint">Body: { "title": "Título", "content": "Texto" }</div>
  </div>
</section>

<section id="status">
  <h2>📡 Status da API</h2>
  <div class="card">
    <span id="apiStatus">Verificando...</span>
  </div>
</section>

<div class="footer">
  Akira Core API — ${new Date().getFullYear()} • Desenvolvido por AkiraDev
</div>

</div>
</div>

<script>
fetch("/")
  .then(() => {
    document.getElementById("apiStatus").textContent = "🟢 API Online";
  })
  .catch(() => {
    document.getElementById("apiStatus").textContent = "🔴 API Offline";
  });
</script>

</body>
</html>
  `);
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
        backdrop-filter: blur(14px);
        border-radius: 18px;
        padding: 32px;
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 0 40px rgba(0,0,0,0.45);
      }

      h1 {
        font-size: 30px;
        margin-bottom: 10px;
      }

      .badge {
        display: inline-block;
        background: #22c55e;
        color: black;
        padding: 5px 14px;
        border-radius: 999px;
        font-weight: bold;
        font-size: 12px;
        margin-bottom: 10px;
      }

      code {
        background: rgba(255,255,255,0.08);
        padding: 8px 12px;
        border-radius: 10px;
        display: block;
        margin: 8px 0;
        font-size: 14px;
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

      .docs-btn {
        display: inline-block;
        margin-top: 18px;
        background: linear-gradient(135deg, #6366f1, #22c55e);
        color: white;
        text-decoration: none;
        padding: 12px 18px;
        border-radius: 12px;
        font-weight: bold;
        transition: 0.2s ease;
      }

      .docs-btn:hover {
        transform: scale(1.04);
        box-shadow: 0 0 18px rgba(99,102,241,0.5);
      }
    </style>
  </head>
  <body>
    <div class="card">
      <span class="badge">ONLINE</span>
      <h1>🚀 Akira Core API</h1>
      <p>Backend oficial da plataforma <strong>AkiraDev</strong>.</p>

      <div class="status" id="status">Carregando status...</div>

      <a href="/docs" class="docs-btn">📚 Abrir Documentação</a>

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
