const express = require('express');
const router = express.Router();
const PostController = require('../Controllers/PostController');
const authMiddleware = require('../Middlewares/auth');

router.get('/:id', authMiddleware, PostController.getPost);

router.get('/', authMiddleware, PostController.getPosts);

router.post('/', authMiddleware, PostController.createPost);

router.put('/:id', authMiddleware, PostController.updatePost);

router.delete('/:id', authMiddleware, PostController.deletePost);

module.exports = router;