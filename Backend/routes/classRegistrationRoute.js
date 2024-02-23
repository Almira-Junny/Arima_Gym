const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllClassRegistrations,
  createClassRegistration,
  getClassRegistration,
  updateClassRegistration,
  deleteClassRegistration,
} = require('../controllers/classRegistrationController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getAllClassRegistrations).post(createClassRegistration);

router
  .route('/:id')
  .get(getClassRegistration)
  .patch(restrictTo('admin', 'pt'), updateClassRegistration)
  .delete(restrictTo('admin', 'pt'), deleteClassRegistration);

module.exports = router;
