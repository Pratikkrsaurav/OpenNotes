import express from 'express';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router()

router.post('/blog/:blogId', protect, )

export default router;