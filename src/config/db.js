import mongoose from "mongoose";
import dns from "dns";
import { env } from "./env.js";

// use public DNS for SRV resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
  if (!env.mongoUri) return;

  try {
    const conn = await mongoose.connect(env.mongoUri, {
      dbName: env.mongoDbName,
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    console.log("MongoDB conectado a", conn.connection.host);
    return conn;
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB desconectado");
  } catch (error) {
    console.error("Error desconectando de MongoDB:", error.message);
    throw error;
  }
};
