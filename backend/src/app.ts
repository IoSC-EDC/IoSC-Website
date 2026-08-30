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
  origin: (origin, callback) => {
    const clientUrl = process.env.CLIENT_URL;
    const whitelist = [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
    ];
    if (clientUrl) {
      whitelist.push(clientUrl.replace(/\/$/, ""));
    }

    if (!origin || whitelist.some(url => origin.startsWith(url))) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
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
