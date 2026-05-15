import "../src/config/env.js";
import { connectDB, disconnectDB } from "../src/config/db.js";
import { Producto } from "../src/models/producto.model.js";

const seeds = [
  { nombre: 'Lapicero', descripcion: 'Lapicero tinta azul', precio: 0.5, cantidad: 100 },
  { nombre: 'Cuaderno', descripcion: 'Cuaderno 100 hojas', precio: 2.5, cantidad: 50 },
  { nombre: 'Mochila', descripcion: 'Mochila escolar', precio: 29.99, cantidad: 10 },
  { nombre: 'Borrador', descripcion: 'Borrador blanco', precio: 0.4, cantidad: 80 },
  { nombre: 'Regla 30cm', descripcion: 'Regla transparente', precio: 0.9, cantidad: 40 },
  { nombre: 'Calculadora', descripcion: 'Calculadora científica', precio: 14.99, cantidad: 12 },
  { nombre: 'Marcadores', descripcion: 'Set de 6 marcadores', precio: 4.5, cantidad: 25 },
  { nombre: 'Carpeta', descripcion: 'Carpeta plástica A4', precio: 1.2, cantidad: 60 },
  { nombre: 'Pegamento', descripcion: 'Pegamento en barra', precio: 0.8, cantidad: 35 },
  { nombre: 'Tijeras', descripcion: 'Tijeras escolares', precio: 2.3, cantidad: 20 },
];

const run = async () => {
  try {
    await connectDB();
    let created = 0; let exist = 0;
    for (const p of seeds) {
      const f = await Producto.findOne({ nombre: p.nombre });
      if (f) { exist++; continue; }
      await Producto.create(p);
      created++;
    }
    const total = await Producto.countDocuments();
    console.log('SEED_CREATED', created, 'SEED_EXISTING', exist, 'TOTAL', total);
  } catch (e) {
    console.error('SEED_ERROR', e && e.message ? e.message : String(e));
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
};

run();
