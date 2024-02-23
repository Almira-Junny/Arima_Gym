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
router.use(protect);

router.patch('/updatePassword', updatePassword);

router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);

router.delete('/deleteMe', deleteMe);

router.get('/me', getMe);

router.get('/createQr', createQr);

router.get('/scanQr/:token', restrictTo('admin'), scanQr);

router.get('/searchUserByNumber/:number', getUserByNumber);

router.route('/').post(restrictTo('admin'), createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(restrictTo('admin'), updateUser)
  .delete(restrictTo('admin'), deleteUser);

module.exports = router;
