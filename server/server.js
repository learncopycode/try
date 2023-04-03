const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require("passport");
const { authenticate } = require("./authMiddleware");
const authRoutes = require("./routes/authRoutes");

// Import routes
const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const jobRoutes = require('./routes/jobRoutes');
// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
// Use routes as middleware
app.use('/api', userRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', jobRoutes);
app.use("/api/auth", authRoutes);


// Protect routes that require authentication
app.use("/users", authenticate, userRoutes);
app.use("/schedules", authenticate, scheduleRoutes);
app.use("/jobs", authenticate, jobRoutes);


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('MongoDB Atlas connected');
}).catch((err) => {
  console.log(err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
