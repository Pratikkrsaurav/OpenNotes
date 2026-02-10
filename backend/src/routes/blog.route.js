import express from 'express';
import protect from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js'
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog, likeBlog } from '../controller/blog.controller.js';

const router = express.Router()

router.get('/', getAllBlogs)
router.get('/:slug', getSingleBlog)

router.post(
    "/", 
    protect, 
    authorize("admin", "author"), 
    createBlog
);

router.put(
    "/:id",
    protect,
    authorize("admin", "author"),
    updateBlog
)

router.delete(
    "/:id",
    protect,
    authorize("admin", "author"),
    deleteBlog
)

router.post(
    "/:id/like",
    protect,
    likeBlog
)

export default router;

