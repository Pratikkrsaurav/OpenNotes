import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './app.js';

dotenv.config();

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

