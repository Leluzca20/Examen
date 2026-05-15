import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    precio: { type: Number, required: true, min: 0 },
    cantidad: { type: Number, default: 0, min: 0 },
    disponible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Producto = mongoose.model("Producto", productoSchema);

export const productoOperations = {
  findAll: async () => Producto.find(),
  findById: async (id) => Producto.findById(id),
  create: async (data) => new Producto(data).save(),
  updateById: async (id, data) => Producto.findByIdAndUpdate(id, data, { new: true }),
  deleteById: async (id) => Producto.findByIdAndDelete(id),
};
