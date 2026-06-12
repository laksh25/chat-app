import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { authenticate, AuthRequest } from "./middleware/auth.middleware";

const app = express();

// ── Middleware ────────────────────────────────────────
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true, // allow cookies cross origin
  }),
);
app.use(cookieParser());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/api/me", authenticate, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const bootstrap = async () => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
    logger.info(`❤️  Health check: http://localhost:${env.PORT}/health`);
  });
};

bootstrap();
