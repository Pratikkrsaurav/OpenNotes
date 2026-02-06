import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.warn('Continuing without DB connection so server can start for local testing.');
        // Do not exit process here — allow server to start so simple routes (like /testdata)
        // can be used without a database during development.
    }
}

export default connectDB;