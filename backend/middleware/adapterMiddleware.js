const { useRealAdapter } = require("../config/featureFlags");

function adapterMiddleware(req, res, next) {
  req.useRealAdapter = useRealAdapter;
  next();
}

module.exports = adapterMiddleware;
