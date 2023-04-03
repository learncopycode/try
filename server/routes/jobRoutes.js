const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Routes for Job model
router.post('/jobs', jobController.createJob);
router.get('/jobs', jobController.getAllJobs);
router.get('/jobs/:id', jobController.getJobById);
router.put('/jobs/:id', jobController.updateJobById);
router.delete('/jobs/:id', jobController.deleteJobById);

module.exports = router;
