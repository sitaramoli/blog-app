import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import {errorHandler} from "./middlewares/errorHandler";

dotenv.config();

//DB connection
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database is connected!")
}).catch((error) => {
  console.log(error)
})

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

app.use(errorHandler);
