const mongoose = require('mongoose');

const classScheduleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên cho lớp'],
    },
    trainer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Vui lòng chọn huấn luyện viên cho lớp'],
    },
    date: {
      type: Date,
      required: [true, 'Vui lòng nhập thời gian bắt đầu lớp'],
    },
    duration: {
      type: Number,
      required: [true, 'Vui lòng nhập số giờ tập của lớp'],
    },
    capacity: {
      type: Number,
      required: [true, 'Vui lòng nhập số lượng thành viên lớp tối đa'],
    },
    registration: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
);

classScheduleSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'trainer',
    select: '-__v -plan',
  });
  next();
});

const ClassSchedule = mongoose.model('ClassSchedule', classScheduleSchema);

module.exports = ClassSchedule;
