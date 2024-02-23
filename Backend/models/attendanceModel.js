const mongoose = require('mongoose');
const ClassRegistration = require('./classRegistrationModel');

const attendanceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Ngày đến tập cần có thông tin người tập'],
  },
  checkInTime: {
    type: Date,
    default: () => Date.now(),
  },
});

attendanceSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v -passwordResetExpire -passwordResetToken -plan',
  });
  next();
});

attendanceSchema.pre('save', async function (next) {
  const registrations = await ClassRegistration.find({
    user: this.user,
    date: {
      $gt: Date.now() - 2 * 24 * 60 * 60 * 1000,
      $lt: Date.now(),
    },
  });

  const result = registrations.find(
    (registration) =>
      registration.class.date.getTime() > Date.now() - 30 * 60 * 1000 &&
      registration.class.date.getTime() < Date.now() + 30 * 60 * 1000,
  );

  if (result) {
    await ClassRegistration.findByIdAndUpdate(result._id, {
      status: 'attended',
    });
  }

  next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
