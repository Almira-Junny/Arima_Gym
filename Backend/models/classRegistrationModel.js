const mongoose = require('mongoose');

const classRegistrationSchema = mongoose.Schema({
  class: {
    type: mongoose.Schema.ObjectId,
    ref: 'ClassSchedule',
    required: [true, 'Đăng ký lớp cần có thông tin của lớp'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Đăng ký lớp cần có thông tin người tập'],
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  status: {
    type: String,
    enum: ['registered', 'attended', 'canceled'],
    default: 'registered',
  },
});

classRegistrationSchema.index({ class: 1, user: 1 }, { unique: true });

classRegistrationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'class',
    select: '-__v',
  }).populate({
    path: 'user',
    select: '-__v -passwordResetExpire -passwordResetToken -plan',
  });
  next();
});

const ClassRegistration = mongoose.model(
  'ClassRegistration',
  classRegistrationSchema,
);

module.exports = ClassRegistration;
