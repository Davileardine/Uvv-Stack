const express = require('express');
const router = express.Router();
const StackController = require('../Controllers/StackController');
const authMiddleware = require('../Middlewares/auth');

router.get('/:id', StackController.getStack);

router.post('/', authMiddleware, StackController.createStack);


module.exports = router;