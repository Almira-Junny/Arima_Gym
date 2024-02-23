const ClassRegistration = require('../models/classRegistrationModel');
const ClassSchedule = require('../models/classScheduleModel');
const { getAll, getOne, updateOne } = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllClassRegistrations = getAll(ClassRegistration);
exports.getClassRegistration = getOne(ClassRegistration);
exports.createClassRegistration = catchAsync(async (req, res, next) => {
  const classSchedule = await ClassSchedule.findById(req.body.class);

  if (!classSchedule) {
    return next(new AppError('Không tìm thấy lớp học', 404));
  }

  if (classSchedule.capacity === classSchedule.registration) {
    return next(
      new AppError('Lớp đã đủ học viên. Vui lòng đăng ký lớp khác', 400),
    );
  }

  const registration = await ClassRegistration.create(req.body);

  classSchedule.registration += 1;
  await classSchedule.save();

  res.status(200).json({
    status: 'success',
    data: registration,
  });
});
exports.updateClassRegistration = updateOne(ClassRegistration);
exports.deleteClassRegistration = catchAsync(async (req, res, next) => {
  const registration = await ClassRegistration.findByIdAndDelete(req.params.id);

  if (!registration) {
    return next(new AppError('Không có dữ liệu với id này', 404));
  }

  const classSchedule = await ClassSchedule.findById(registration.class);

  classSchedule.registration -= 1;
  await classSchedule.save();

  res.status(200).json({
    status: 'success',
  });
});
