// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Allow these origins
const allowedOrigins = [
  'https://fdeploy-brown.vercel.app', // ✅ your frontend
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
}));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// ✅ Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
  });
