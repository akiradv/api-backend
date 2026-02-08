import express from "express";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "dev_secret";

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

// Criar post
router.post("/", auth, (req, res) => {
  const { title, content } = req.body;

  db.run(
    "INSERT INTO posts (title, content, created_at) VALUES (?, ?, ?)",
    [title, content, new Date().toISOString()],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

// Listar posts
router.get("/", (req, res) => {
  db.all("SELECT * FROM posts ORDER BY id DESC", (err, rows) => {
    res.json(rows);
  });
});

export default router;
