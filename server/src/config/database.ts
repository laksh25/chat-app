import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("✅ MongoDB connected");

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB error:", err);
    });
  } catch (error) {
    logger.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
