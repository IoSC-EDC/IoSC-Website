import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 IoSC Production Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 Event API Endpoint available at http://localhost:${PORT}/api/v1/events`);
});
