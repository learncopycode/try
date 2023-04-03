const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String, required: true },
  car: { type: String, required: true },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
