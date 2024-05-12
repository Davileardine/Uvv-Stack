const express = require('express');
const router = express.Router();
const CommentController = require('../Controllers/CommentController');
const authMiddleware = require('../Middlewares/auth');

router.post('/', authMiddleware, CommentController.postComment);

router.put('/:id', authMiddleware, CommentController.editComment);

router.put('/:id/vote', authMiddleware, CommentController.vote);

module.exports = router;
