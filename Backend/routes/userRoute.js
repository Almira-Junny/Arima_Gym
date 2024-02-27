const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  logout,
} = require('../controllers/authController');
const {
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createQr,
  scanQr,
  getUserByNumber,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.route('/').get(getAllUsers);

router.post('/logout', logout);

//Protect all route after this

router.patch('/updatePassword', protect, updatePassword);

router.patch('/updateMe', protect, uploadUserPhoto, resizeUserPhoto, updateMe);

router.delete('/deleteMe', protect, deleteMe);

router.get('/me', protect, getMe);

router.get('/createQr', protect, createQr);

router.get('/scanQr/:token', protect, restrictTo('admin'), scanQr);

router.get('/searchUserByNumber/:number', protect, getUserByNumber);

router.route('/').post(protect, restrictTo('admin'), createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(protect, restrictTo('admin'), updateUser)
  .delete(protect, restrictTo('admin'), deleteUser);

module.exports = router;
