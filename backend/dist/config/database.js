"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.warn("⚠️ DATABASE_URL is not defined in environment variables. Database features will fail until configured.");
}
exports.pool = new pg_1.Pool({
    connectionString,
    ssl: process.env.NODE_ENV === "production" || connectionString?.includes("neon.tech")
        ? { rejectUnauthorized: false }
        : false,
});
exports.pool.on("connect", () => {
    console.log("🐘 Connected to PostgreSQL database pool.");
});
exports.pool.on("error", (err) => {
    console.error("❌ Unexpected PostgreSQL Pool Error:", err);
});
