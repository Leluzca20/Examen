import { productoOperations } from "../models/producto.model.js";

export const productosController = {
  getAll: async (req, res) => {
    try {
      const items = await productoOperations.findAll();
      res.json({ success: true, data: items, count: items.length });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error obteniendo productos", error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await productoOperations.findById(id);
      if (!item) return res.status(404).json({ success: false, message: "Producto no encontrado" });
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error obteniendo producto", error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const item = await productoOperations.create(req.body);
      res.status(201).json({ success: true, message: "Producto creado", data: item });
    } catch (error) {
      res.status(400).json({ success: false, message: "Error creando producto", error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await productoOperations.updateById(id, req.body);
      if (!item) return res.status(404).json({ success: false, message: "Producto no encontrado" });
      res.json({ success: true, message: "Producto actualizado", data: item });
    } catch (error) {
      res.status(400).json({ success: false, message: "Error actualizando producto", error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await productoOperations.deleteById(id);
      if (!item) return res.status(404).json({ success: false, message: "Producto no encontrado" });
      res.json({ success: true, message: "Producto eliminado", data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error eliminando producto", error: error.message });
    }
  },
};
