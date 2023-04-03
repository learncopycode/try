const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Routes for Schedule model
router.post('/schedules', scheduleController.createSchedule);
router.get('/schedules', scheduleController.getAllSchedules);
router.get('/schedules/:id', scheduleController.getScheduleById);
router.put('/schedules/:id', scheduleController.updateScheduleById);
router.delete('/schedules/:id', scheduleController.deleteScheduleById);

module.exports = router;
