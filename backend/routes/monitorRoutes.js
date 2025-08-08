const express = require("express");
const router = express.Router();
const monitor = require("../utils/monitor");

router.get("/", (req, res) => {
  res.json({
    errorCount: monitor.getErrorCount(),
    adapterStatus: process.env.USE_REAL_ADAPTER === "true" ? "live" : "stub",
  });
});

module.exports = router;
