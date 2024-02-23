const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllClassSchedules,
  createClassSchedule,
  getClassSchedule,
  updateClassSchedule,
  deleteClassSchedule,
  getClassScheduleByName,
} = require('../controllers/classScheduleController');
const classRegistrationRouter = require('./classRegistrationRoute');

const router = express.Router();

router.use(protect);

router.use('/classByName/:name', getClassScheduleByName);

router.use('/:classId/classRegistrations', classRegistrationRouter);

router
  .route('/')
  .get(getAllClassSchedules)
  .post(restrictTo('admin', 'pt'), createClassSchedule);

router
  .route('/:id')
  .get(getClassSchedule)
  .patch(restrictTo('admin', 'pt'), updateClassSchedule)
  .delete(restrictTo('admin', 'pt'), deleteClassSchedule);

module.exports = router;
