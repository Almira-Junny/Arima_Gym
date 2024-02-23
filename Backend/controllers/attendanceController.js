const Attendance = require('../models/attendanceModel');
const catchAsync = require('../utils/catchAsync');
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} = require('./handlerFactory');
const APIFeatures = require('../utils/apiFeatures');

exports.getMyAttendance = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Attendance.find({
      user: req.user._id,
    }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const attendances = await features.query;

  attendances.forEach((attendance) => {
    attendance.user = undefined;
  });

  res.status(200).json({
    status: 'success',
    result: attendances.length,
    data: attendances,
  });
});

exports.getAttendanceToday = catchAsync(async (req, res, next) => {
  const attendances = await Attendance.find();

  const result = attendances.filter(
    (attendance) =>
      new Date(attendance.checkInTime).toDateString() ===
      new Date().toDateString(),
  );

  res.status(200).json({
    status: 'success',
    result: result.length,
    data: result,
  });
});

exports.getAllAttendances = getAll(Attendance);
exports.getAttendance = getOne(Attendance);
exports.createAttendance = createOne(Attendance);
exports.updateAttendance = updateOne(Attendance);
exports.deleteAttendance = deleteOne(Attendance);
