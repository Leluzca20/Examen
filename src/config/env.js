import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 3000,
  apiPrefix: process.env.API_PREFIX || "/api/v1",
  mongoUri: process.env.MONGO_URI || "",
  mongoDbName: process.env.MONGO_DB_NAME || "examen",
};

export const validateEnv = () => {
  if (!env.mongoUri) {
    console.error("Error: MONGO_URI no está configurada en .env");
    process.exit(1);
  }
};
