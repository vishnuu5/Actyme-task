require("dotenv").config();

module.exports = {
  useRealAdapter: process.env.USE_REAL_ADAPTER === "true",
};
