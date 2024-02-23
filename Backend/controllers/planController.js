const Plan = require('../models/planModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');

exports.getAllPlans = getAll(Plan);
exports.getPlan = getOne(Plan);
exports.createPlan = createOne(Plan);
exports.updatePlan = updateOne(Plan);
exports.deletePlan = deleteOne(Plan);

exports.getPlanByName = catchAsync(async (req, res, next) => {
  const { name } = req.params;

  const features = new APIFeatures(
    Plan.find({ name: { $regex: name, $options: 'i' } }),
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
