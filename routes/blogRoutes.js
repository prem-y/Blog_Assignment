const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(authMiddleware.authenticate); // Router-level authentication middleware

router.get('/', blogController.getAllBlogs);
router.post('/',  blogController.createBlog);
router.get('/:authorId',blogController.getBlogByAuthorId);

router.put('/:id',  blogController.updateBlog);
router.delete('/:id',  blogController.deleteBlog);
module.exports = router;
