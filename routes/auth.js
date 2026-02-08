import express from "express";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "dev_secret";

// Registro
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    function (err) {
      if (err) return res.status(400).json({ error: "Usuário já existe" });
      res.json({ success: true });
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, user) => {
      if (!user) return res.status(401).json({ error: "Login inválido" });

      const token = jwt.sign({ id: user.id }, SECRET);
      res.json({ token });
    }
  );
});

export default router;
