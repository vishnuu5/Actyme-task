const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

exports.testConnectivity = async (req, res) => {
  const logsDir = path.join(__dirname, "../logs");
  const reportPath = path.join(logsDir, "connectivity-report.json");

  try {
    const result = {
      adapter: "mock-adapter",
      status: "success",
      message: "Adapter connection success",
    };

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }

    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          ...result,
        },
        null,
        2
      )
    );

    logger.info("Adapter connectivity test passed");
    res.json(result);
  } catch (err) {
    const errorResult = {
      adapter: "mock-adapter",
      status: "failed",
      error: err.message,
    };

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }

    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          ...errorResult,
        },
        null,
        2
      )
    );

    logger.error("Adapter connectivity test failed:", err);
    res.status(500).json(errorResult);
  }
};
