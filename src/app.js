import express from "express";
import cors from "cors";
import path from "path";
import { productosRoutes } from "./routes/productos.routes.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve frontend static files under /public
app.use('/public', express.static(path.join(process.cwd(), 'public')));

// Public root info (only for GET /)
app.get("/", (req, res) => res.json({ message: "API Examen - usar /api/v1/productos" }));

// Serve frontend assets at root (e.g., /styles.css, /app.js)
app.use(express.static(path.join(process.cwd(), 'public')));

// API routes
app.use("/api/v1/productos", productosRoutes);

// 404
app.use((req, res) => res.status(404).json({ success: false, message: "Ruta no encontrada" }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Error interno", error: err.message });
});

export default app;
