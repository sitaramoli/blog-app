import express from 'express';
import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv"

dotenv.config();

//DB connection
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database is connected!")
}).catch((error) => {
  console.log(error)
})

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
