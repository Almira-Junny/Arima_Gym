const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllAttendances,
  getMyAttendance,
  createAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceToday,
} = require('../controllers/attendanceController');

const router = express.Router();

router.use(protect);

router.route('/me').get(getMyAttendance);

router.route('/today').get(restrictTo('admin'), getAttendanceToday);

router
  .route('/')
  .get(restrictTo('admin'), getAllAttendances)
  .post(createAttendance);

router
  .route('/:id')
  .get(getAttendance)
  .patch(restrictTo('admin'), updateAttendance)
  .delete(restrictTo('admin'), deleteAttendance);

module.exports = router;
