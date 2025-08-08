const Task = require("../models/Task");

// Select N random completed tasks
async function drawWeeklyWinners(limit = 3) {
  const completedTasks = await Task.aggregate([
    { $match: { completed: true } },
    { $sample: { size: limit } },
  ]);
  return completedTasks;
}

module.exports = drawWeeklyWinners;
