import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env, validateEnv } from "./config/env.js";

const start = async () => {
  try {
    validateEnv();
    await connectDB();
    app.listen(env.port, () => {
      console.log(`Servidor iniciado en http://localhost:${env.port}`);
      console.log(`API: http://localhost:${env.port}${env.apiPrefix}/productoss`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }
};

start();
