const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên cho gói tập'],
    unique: [true, 'Tên của gói tập không được trùng nhau'],
  },
  price: {
    type: Number,
    required: [true, 'Vui lòng nhập giá tiền cho gói tập'],
  },
  duration: {
    type: Number,
    required: [true, 'Vui lòng nhập số ngày của gói tập'],
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập miêu tả của gói tập'],
  },
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
