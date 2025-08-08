const Task = require("../models/Task");

async function testConnectivity() {
  try {
    const sample = await Task.find({}).limit(3);
    console.log(
      "Connectivity Test Passed:",
      sample.map((t) => t.title)
    );
    return true;
  } catch (err) {
    console.error("Connectivity Test Failed:", err);
    return false;
  }
}

module.exports = testConnectivity;
