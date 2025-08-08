const app = require("./app");
const mongoose = require("mongoose");
const cron = require("node-cron");
const drawWinners = require("./utils/drawWinners");
const testConnectivity = require("./services/connectivityTest");
const logger = require("./utils/logger");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
  logger.info("Created logs directory");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    logger.info("Connected to MongoDB");

    await testConnectivity();

    app.listen(PORT, () => {
      logger.info(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("MongoDB connection failed:", err);
  });

cron.schedule("0 0 * * 0", async () => {
  try {
    const winners = await drawWinners();
    logger.info(
      "🎉 Weekly Draw Winners:",
      winners.map((w) => w.title)
    );
  } catch (error) {
    logger.error("Weekly Draw Failed:", error);
  }
});

// Optional: Handle graceful shutdown
process.on("SIGINT", () => {
  logger.info("Server shutting down...");
  process.exit();
});
