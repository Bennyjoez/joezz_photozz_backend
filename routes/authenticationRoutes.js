const express = require('express');

const router = express.Router();
const { registerUser, loginUser, resetPassword } = require('../controllers/authenticationController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/reset_password').post(resetPassword);

module.exports = router;