import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const rawUrl = process.env.DATABASE_URL;
const connectionString = rawUrl ? rawUrl.replace(/&channel_binding=require/g, "").trim() : "";

if (!connectionString) {
  console.warn("⚠️ DATABASE_URL is not defined in environment variables. Database features will fail until configured.");
}

export const pool = new Pool({
  connectionString: connectionString || undefined,
  ssl: process.env.NODE_ENV === "production" || connectionString?.includes("neon.tech")
    ? { rejectUnauthorized: false }
    : false,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

pool.on("connect", () => {
  console.log("🐘 Connected to PostgreSQL database pool.");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected PostgreSQL Pool Error:", err.message);
});
