import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/error.js";
import videoRoutes from "./routes/video.js"
import signUploadRoutes from "./routes/sign-upload.js"
import fetchVideosRoutes from "./routes/fetch-videos.js";
//import { connect } from "mongoose";
import { spawn } from 'child_process';
import path from 'path';
import multer from 'multer';

dotenv.config();

// Express app
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Set up multer for file uploads ************************
// const upload = multer({ dest: 'uploads/' });

// Routes
app.use("/api/videos", videoRoutes);
app.use("/api/sign-upload", signUploadRoutes);
app.use("/api/fetch-videos", fetchVideosRoutes);



app.use(errorHandler);

// Listen to the requests
app.listen(port, () => {
    // connect DB
    connectDB();
    console.log("Server started on port ", port);
})