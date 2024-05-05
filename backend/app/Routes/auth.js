const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');
const authMiddleware = require('../Middlewares/auth');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/logout', AuthController.logout);

module.exports = router;