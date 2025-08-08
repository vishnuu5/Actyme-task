module.exports = function fallbackHandler(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.error("Falling back to stub logic due to error:", error.message);
      res.status(500).json({ message: "Fallback executed due to error" });
    }
  };
};
