const Task = require("../models/Task");
const logger = require("../utils/logger");
const monitor = require("../utils/monitor");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    logger.info("Fetched tasks successfully");
    res.json(tasks);
  } catch (error) {
    logger.error("Error fetching tasks:", error);
    monitor.incrementError();
    res.status(500).json({ error: "Server error" });
  }
};

exports.createTask = async (req, res) => {
  const { title, rewardPoints } = req.body;
  try {
    const newTask = await Task.create({ title, rewardPoints });
    logger.info("Created task:", { title });
    res.status(201).json(newTask);
  } catch (error) {
    logger.error("Task creation failed:", error);
    monitor.incrementError();
    res.status(400).json({ error: "Invalid task data" });
  }
};

exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      logger.warn("Task not found:", req.params.id);
      return res.status(404).json({ error: "Task not found" });
    }

    task.completed = true;
    await task.save();

    logger.info("Task marked completed:", { id: task._id });
    res.json({ message: "Task marked as completed", task });
  } catch (error) {
    logger.error("Error completing task:", error);
    monitor.incrementError();
    res.status(500).json({ error: "Server error" });
  }
};
