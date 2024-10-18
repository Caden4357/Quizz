import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import userRoutes from './routes/user.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import cookieParser from 'cookie-parser';
const PORT = process.env.PORT;
const app = express();
dotenv.config();
dbConnect();
app.use(express.json(), cors({credentials:true, origin: 'http://localhost:5173'}));
app.use(cookieParser());
app.use('/api', userRoutes);
app.use('/api', quizRoutes)


app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);

