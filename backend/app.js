const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adapterRoutes = require("./routes/adapterRoutes");
const monitorRoutes = require("./routes/monitorRoutes");

const morgan = require("morgan");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("combined"));

app.use("/api/tasks", taskRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/monitor", monitorRoutes);
app.use("/api/adapter", adapterRoutes);

app.get("/", (req, res) => {
  res.send("🌐 Actyme Backend is up!");
});

module.exports = app;
