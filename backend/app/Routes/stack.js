const express = require('express');
const router = express.Router();
const StackController = require('../Controllers/StackController');
const authMiddleware = require('../Middlewares/auth');

router.post('/', StackController.createStack);

module.exports = router;