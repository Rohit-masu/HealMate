import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/usersRoute.js';

// app.use("/api/admin", adminRoutes);


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary();

// middleware
app.use(express.json())
// app.use(bodyParser.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));



// api endpoints
app.use("/api/admin", adminRouter); // ✅ Base path


// // localhost:5000/api/admin/add-doctor

app.use('/api/doctor', doctorRouter)
app.use('/api/user' , userRouter)

app.get('/' ,(req,res)=>{
    res.send('API WORKING ')
})

app.use((req, res, next) => {
    console.log("❌ Route not found:", req.method, req.originalUrl);
    res.status(404).json({ error: "Route not found" });
  });
  
app.listen(port, ()=> console.log("Server Started" , port ) )