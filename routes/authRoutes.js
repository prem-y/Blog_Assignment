const express = require('express');
const authController = require('../controllers/authController');
const validationMiddleware = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/login', validationMiddleware.validateLogin, authController.login);
router.post('/register', validationMiddleware.validateRegister, authController.register);

module.exports = router;
