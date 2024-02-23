const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    //For https
    secure: true,
    //Prevent browser access or modify cookie
    httpOnly: true,
  };

  if (process.env.NODE_ENV !== 'production') {
    cookieOptions.secure = false;
  }

  res.cookie('jwt', token, cookieOptions);

  //Not send encrypted pass for user
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Vui lòng nhập email và mật khẩu', 400));
  }

  //Check if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError('Email hoặc mật khẩu không chính xác', 401));
  }

  //If ok, return success
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //Getting token and check if it's here
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('Vui lòng đăng nhập trước', 401));
  }

  //Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError(
        'Tài khoản không còn tồn tại. Vui lòng tạo tài khoản mới',
        401,
      ),
    );
  }

  //Check if user change password after token is created
  if (user.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'Tài khoản đã thay đổi mật khẩu gần đây. Vui lòng đăng nhập lại',
        401,
      ),
    );
  }

  //Check if user is admin or pt
  if (user.role !== 'user') {
    req.user = user;
    res.locals.user = user;
    return next();
  }

  //Check if user have membership
  if (!user.membershipEndDate) {
    return next(
      new AppError(
        'Tài khoản chưa đăng ký thành viên. Vui lòng mua gói thành viên để sử dụng',
      ),
    );
  }

  //Check if membership date valid
  if (Number(user.membershipEndDate.getTime()) < Date.now()) {
    return next(
      new AppError(
        'Tài khoản đã hết hạn thành viên. Vui lòng mua gói thành viên để sử dụng',
        401,
      ),
    );
  }

  //Grant access
  req.user = user;
  res.locals.user = user;
  next();
});

exports.protectForCheckout = catchAsync(async (req, res, next) => {
  //Getting token and check if it's here
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Vui lòng đăng nhập trước', 401));
  }

  //Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError(
        'Tài khoản không còn tồn tại. Vui lòng tạo tài khoản mới',
        401,
      ),
    );
  }

  //Check if user change password after token is created
  if (user.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'Tài khoản đã thay đổi mật khẩu gần đây. Vui lòng đăng nhập lại',
        401,
      ),
    );
  }

  //Check if user is admin or pt
  if (user.role !== 'user') {
    return next(
      new AppError('Tài khoản Admin hay PT không cần mua gói thành viên', 401),
    );
  }

  //Grant access
  req.user = user;
  res.locals.user = user;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Bạn không có quyền để sử dụng chức năng này', 400),
      );
    }
    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //Check email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('Không có tài khoản nào với email này', 400));
  }

  //Generate random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //Send token to email user
  const resetUrl = `${process.env.FE_URL}/resetPassword?token=${resetToken}`;

  try {
    await new Email(user, resetUrl).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Email sent',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('Không thể gửi email. Vui lòng thử lại sau', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError('Token sai hoặc đã hết hạn. Vui lòng thử lại', 400),
    );
  }

  //Update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;

  await user.save();

  //Return success
  res.status(200).json({
    status: 'success',
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //Check if currentPassword, password, passwordConfirm exists
  const { newPassword, passwordConfirm, currentPassword } = req.body;

  if (!newPassword || !passwordConfirm || !currentPassword) {
    return next(new AppError(' Vui lòng nhập đầy đủ thông tin', 400));
  }

  // Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  //Check if current password correct
  if (!(await user.correctPassword(currentPassword))) {
    return next(new AppError('Mật khẩu hiện tại không chính xác', 401));
  }

  //Check if new password and current password different
  if (newPassword === currentPassword) {
    return next(new AppError('Mật khẩu hiện tại trùng với mật khẩu mới', 400));
  }

  //Update password
  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  //Log user in
  createSendToken(user, 201, res);
});

exports.logout = (req, res, next) => {
  res.clearCookie('jwt');
  res.status(200).json({
    status: 'success',
  });
};
