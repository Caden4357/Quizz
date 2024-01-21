import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import userRoutes from './routes/user.routes.js';
const PORT = process.env.PORT;
const app = express();
dotenv.config();
dbConnect();
app.use(express.json(), cors({ origin: 'http://127.0.0.1:5173'}));
app.use('/api', userRoutes);



app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);

