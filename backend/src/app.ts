import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import eventRoutes from "./routes/event.routes";
import applicationRoutes from "./routes/application.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { ApiResponse } from "./utils/ApiResponse";

const app: Application = express();

// Security & Utility Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(200, "IoSC Backend API is online", {
    status: "healthy",
    timestamp: new Date().toISOString(),
  }));
});

// API Routes
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/applications", applicationRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
