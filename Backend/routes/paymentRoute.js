const express = require('express');
const {
  protect,
  restrictTo,
  protectForCheckout,
} = require('../controllers/authController');
const {
  getCheckoutSession,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment,
  getPaymentByName,
} = require('../controllers/paymentController');

const router = express.Router();

router.get('/checkout-session/:planId', protectForCheckout, getCheckoutSession);

router.use(protect);

router.route('/').get(restrictTo('admin'), getAllPayments);

router.route('/paymentByName/:name').get(restrictTo('admin'), getPaymentByName);

router
  .route('/:id')
  .get(getPayment)
  .patch(restrictTo('admin'), updatePayment)
  .delete(restrictTo('admin'), deletePayment);

module.exports = router;
