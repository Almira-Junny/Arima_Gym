const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  lastName: {
    type: String,
    required: [true, 'Vui lòng nhập họ của bạn'],
    minLength: [2, 'Vui lòng nhập họ tối thiểu 2 chữ'],
    maxLength: [30, 'Vui lòng nhập họ tối đa 30 chữ'],
  },
  firstName: {
    type: String,
    required: [true, 'Vui lòng nhập tên của bạn'],
    minLength: [2, 'Vui lòng nhập tên tối thiểu 2 chữ'],
    maxLength: [30, 'Vui lòng nhập tên tối đa 30 chữ'],
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Vui lòng nhập email'],
    unique: [true, 'Email này đã được sử dụng'],
    lowercase: [true, 'Email không được viết hoa'],
    validate: [validator.isEmail, 'Vui lòng nhập đúng email'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Vui lòng nhập số điện thoại'],
    unique: [true, 'Số điện thoại này đã được sử dụng'],
    validate: {
      validator: function (val) {
        return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(val);
      },
      message: 'Số điện thoại không hợp lệ, vui lòng nhập lại',
    },
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu'],
    minLength: [8, 'Vui lòng nhập mật khẩu tối thiểu 8 chữ'],
    maxLength: [50, 'Vui lòng nhập mật khẩu tối đa 50 chữ'],
    select: false,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Vui lòng nhập ngày sinh'],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, 'Vui lòng chọn giới tính'],
    enum: ['male', 'female', 'other'],
  },
  role: {
    type: String,
    enum: ['admin', 'pt', 'user'],
    default: 'user',
  },
  bio: String,
  hireDate: Date,
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: 'Plan',
  },
  qr: String,
  qrExpire: Date,
  qrLastUsedAt: Date,
  membershipStartDate: Date,
  membershipEndDate: Date,
  passwordConfirm: {
    type: String,
    required: [true, 'Vui lòng xác nhận mật khẩu'],
    validate: {
      //Only work when save()
      validator: function (val) {
        return val === this.password;
      },
      message: 'Mật khẩu không giống nhau',
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.index({ phoneNumber: 1 }, { fullName: 1 });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.passwordChangeAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('lastName') && !this.isModified('firstName')) {
    return next();
  }

  this.fullName = `${this.lastName} ${this.firstName}`;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } }).populate({
    path: 'plan',
    select: '-__v',
  });
  next();
});

userSchema.methods.correctPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = Number(this.passwordChangeAt.getTime()) / 1000;
    return changedTimestamp >= Number(JWTTimestamp);
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createQr = function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.qr = crypto.createHash('sha256').update(token).digest('hex');

  this.qrExpire = Date.now() + 10 * 60 * 1000;

  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
