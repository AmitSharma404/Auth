import mongoose from 'mongoose';

// console.log(process.env.MONGODB_URI);

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',() => console.log("Database connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}`);
    } catch (error) {
        console.log("Database connection Error",error);
    }
}

// connectDB();

export default connectDB;