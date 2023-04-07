const router = require('express').Router();
const { register, login, logout, getMe, forgotPassword, resetPassword, updateDetails, updatePassword } = require('../controllers/auth');


router.route('/register').post(register);
router.route('/login').post(login);


module.exports = router;