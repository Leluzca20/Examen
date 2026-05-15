import { Router } from "express";
import { productosController } from "../controllers/productos.controller.js";

export const productosRoutes = Router();

productosRoutes.get("/", productosController.getAll);
productosRoutes.get("/:id", productosController.getById);
productosRoutes.post("/", productosController.create);
productosRoutes.put("/:id", productosController.update);
productosRoutes.delete("/:id", productosController.delete);
