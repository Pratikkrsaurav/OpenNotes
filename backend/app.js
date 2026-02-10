import express from 'express';
import cors from 'cors';

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

import userRoutes from './src/routes/user.route.js';
import blogRoutes from './src/routes/blog.route.js';

app.use("/api/v1/users", userRoutes)
export default app;
app.use("/api/v1/blogs", blogRoutes)

