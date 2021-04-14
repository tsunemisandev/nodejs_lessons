const router = require('express').Router();
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController');
const userFormValidator = require('../validators/NewUserValidator');

router.get('/', authController.setLoggedUser, userController.doGetLogin);
router.get('/login', authController.setLoggedUser, userController.doGetLogin);
router.get('/user/register', authController.setLoggedUser, userController.doGetRegister);
router.post(
  '/user/register',
  userFormValidator,
  authController.setLoggedUser,
  userController.doPostRegister,
  authController.setToken,
  userController.doRedirectHome
);
router.get('/user/home', authController.verify, authController.setLoggedUser, userController.doGetHome);
router.get('/user/logout', authController.setLoggedUser, authController.doGetLogout, userController.doRedirectLogin);
router.post(
  '/login',
  authController.setLoggedUser,
  authController.doPostLogin,
  authController.setLoggedUser,
  userController.doRedirectHome
);

module.exports = router;
