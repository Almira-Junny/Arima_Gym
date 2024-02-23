const ClassSchedule = require('../models/classScheduleModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} = require('./handlerFactory');

exports.getAllClassSchedules = getAll(ClassSchedule);
exports.getClassSchedule = getOne(ClassSchedule);
exports.createClassSchedule = createOne(ClassSchedule);
exports.updateClassSchedule = updateOne(ClassSchedule);
exports.deleteClassSchedule = deleteOne(ClassSchedule);

exports.getClassScheduleByName = catchAsync(async (req, res, next) => {
  const { name } = req.params;

  const features = new APIFeatures(
    ClassSchedule.find({ name: { $regex: name, $options: 'i' } }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const data = await features.query;

  res.status(200).json({
    status: 'success',
    result: data.length,
    data,
  });
});
