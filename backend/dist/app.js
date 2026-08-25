"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const ApiResponse_1 = require("./utils/ApiResponse");
const app = (0, express_1.default)();
// Security & Utility Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check Endpoint
app.get("/api/v1/health", (_req, res) => {
    res.status(200).json(new ApiResponse_1.ApiResponse(200, "IoSC Backend API is online", {
        status: "healthy",
        timestamp: new Date().toISOString(),
    }));
});
// API Routes
app.use("/api/v1/events", event_routes_1.default);
app.use("/api/v1/applications", application_routes_1.default);
// Global Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
