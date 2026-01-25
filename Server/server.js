import 'dotenv/config'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import connectDB from './config/mongodb.js';
import { authRouter } from './Routes/authRoutes.js';
import {authenticate} from './Middlewares/authenticate.js'
connectDB();
const PORT = process.env.PORT;
const app = express();
app.use(cookieParser());
app.use(cors({credentials:true}));
app.use(express.json())

// middlewares
app.use(authenticate)
// api endpoints

// my apis

app.get('/login',(req,res) => res.send("Api is working"));
app.use('/api/auth',authRouter);

app.listen(PORT,() => {
    console.log(`Server is listening at PORT: ${PORT}`)
})
