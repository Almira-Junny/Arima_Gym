const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const Attendance = require('../models/attendanceModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} = require('./handlerFactory');
const APIFeatures = require('../utils/apiFeatures');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  const fileSize = Number(req.headers['content-length']);
  if (file.mimetype.startsWith('image') && fileSize <= 5000000) {
    cb(null, true);
  } else if (fileSize > 5000000) {
    cb(new AppError('Kích thước file quá lớn', 400), false);
  } else {
    cb(new AppError('Vui lòng tải lên file ảnh', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

const deletePhotoFromServer = catchAsync(async (photo) => {
  if (photo.startsWith('default')) return;
  const path = `${__dirname}/../public/img/users/${photo}`;
  await fs.unlink(path, (err) => {
    if (err) return console.log(err);
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  let photo;
  //Check if user try to change password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'Không thể cập nhật mật khẩu với route này. Vui lòng dùng /updatePassword',
        400,
      ),
    );
  }

  const { lastName, firstName, email, phoneNumber, dateOfBirth, gender, bio } =
    req.body;

  if (req.file) {
    photo = req.file.filename;
    await deletePhotoFromServer(req.user.photo);
  }

  //Check if input data is empty
  if (
    !(
      lastName ||
      firstName ||
      email ||
      phoneNumber ||
      dateOfBirth ||
      gender ||
      bio ||
      photo
    )
  ) {
    return next(new AppError('Không có gì để cập nhật', 400));
  }

  //Update data
  const user = await User.findById(req.user.id);
  if (lastName) user.lastName = lastName;
  if (firstName) user.firstName = firstName;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (dateOfBirth) user.dateOfBirth = dateOfBirth;
  if (gender) user.gender = gender;
  if (bio) user.bio = bio;
  if (photo) user.photo = photo;

  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(204).json({
    status: 'success',
  });
});

exports.getMe = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
  });
};

exports.createQr = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.qrLastUsedAt) {
    const day = user.qrLastUsedAt.getDate();
    if (day === new Date().getDate()) {
      return next(
        new AppError(
          'Bạn đã sử dụng qr để quét ngày hôm nay. Vui lòng đợi hôm sau',
          400,
        ),
      );
    }
  }

  const token = user.createQr();

  await user.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.scanQr = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    qr: hashedToken,
    qrExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('QR không đúng hoặc đã hết hạn', 400));
  }

  //Update User
  user.qr = undefined;
  user.qrExpire = undefined;
  user.qrLastUsedAt = Date.now();
  await user.save({
    validateBeforeSave: false,
  });

  await Attendance.create({
    user: user._id,
  });

  res.status(200).json({
    status: 'success',
  });
});

exports.getUserByNumber = catchAsync(async (req, res, next) => {
  const { number } = req.params;

  const features = new APIFeatures(
    User.find({ phoneNumber: { $regex: number, $options: 'i' } }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: users,
  });
});

exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.createUser = createOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
