const express = require("express");
const router = express.Router();
const { testConnectivity } = require("../controllers/adapterController");

router.get("/test-connectivity", testConnectivity);

module.exports = router;
