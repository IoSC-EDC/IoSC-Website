import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("⚠️ DATABASE_URL is not defined in environment variables. Database features will fail until configured.");
}

export const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === "production" || connectionString?.includes("neon.tech")
    ? { rejectUnauthorized: false }
    : false,
});

pool.on("connect", () => {
  console.log("🐘 Connected to PostgreSQL database pool.");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected PostgreSQL Pool Error:", err);
});
