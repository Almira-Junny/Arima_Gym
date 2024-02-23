const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: 'Plan',
    required: [true, 'Đơn mua cần có thông tin gói tập'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Đơn mua cần có thông tin người dùng'],
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  amount: {
    type: Number,
    required: [true, 'Đơn mua cần có giá trị thanh toán'],
  },
  paymentMethod: {
    type: String,
    required: [true, 'Đơn mua cần có phương thức thanh toán'],
  },
  status: {
    type: String,
    required: [true, 'Đơn mua cần có trạng thái thanh toán'],
  },
});

paymentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v -passwordResetExpire -passwordResetToken -plan',
  }).populate({
    path: 'plan',
    select: '-__v',
  });
  next();
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
