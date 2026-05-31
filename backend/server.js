import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/usersRoute.js';

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary();

const allowedOrigins = [
  'https://healermate.vercel.app',
  'https://healermate-admin.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

// ✅ Handle preflight OPTIONS requests for ALL routes
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'atoken', 'dtoken', 'token'],
}));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log('🚫 CORS blocked:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'atoken', 'dtoken', 'token'],
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/debug-env', (req, res) => {
  res.json({
    FRONTEND_URL: process.env.FRONTEND_URL,
    ADMIN_URL: process.env.ADMIN_URL,
    NODE_ENV: process.env.NODE_ENV,
  })
})

app.use("/api/admin", adminRouter);
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('API WORKING')
})

app.use((req, res, next) => {
  console.log("❌ Route not found:", req.method, req.originalUrl);
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => console.log("Server Started", port))
