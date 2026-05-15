import express from "express";
import cors from "cors";
import { productosRoutes } from "./routes/productos.routes.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", (req, res) => res.json({ message: "API Examen - usar /api/v1/productos" }));
app.use("/api/v1/productos", productosRoutes);

// 404
app.use((req, res) => res.status(404).json({ success: false, message: "Ruta no encontrada" }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Error interno", error: err.message });
});

export default app;
