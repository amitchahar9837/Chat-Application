import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/Auth.routes.js';
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
      origin: process.env.origin,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
}));

mongoose.connect(process.env.MONGO_URI).then(() =>{
      console.log("Connected Database...")
}).catch(error =>{
      console.log(error)
})

app.use('/api/auth',authRoutes);


app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(statusCode).json({
            success: false,
            statusCode,
            message
      });
})

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
})
