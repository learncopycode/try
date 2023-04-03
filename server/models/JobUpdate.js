const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["OQ continue", "OQ complete", "PM done"], required: true },
  company: { type: String, required: true },
  text: { type: String, required: true },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
