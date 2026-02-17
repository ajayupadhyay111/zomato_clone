import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'
import { connectDB } from './config/db.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Update this to match your frontend URL
  credentials: true,
}));

app.use("/api/auth",authRoutes)

app.get('/', (req, res) => {
  res.send('Hello from Auth Service!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Auth Service is running on port ${PORT}`);
});