const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllPlans,
  createPlan,
  getPlan,
  updatePlan,
  deletePlan,
  getPlanByName,
} = require('../controllers/planController');

const router = express.Router();

router.get('/planByName/:name', getPlanByName);

router
  .route('/')
  .get(getAllPlans)
  .post(protect, restrictTo('admin'), createPlan);

router
  .route('/:id')
  .get(getPlan)
  .patch(protect, restrictTo('admin'), updatePlan)
  .delete(protect, restrictTo('admin'), deletePlan);

module.exports = router;
