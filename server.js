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

// New endpoint to run the Python script
app.post("/api/run-python", (req, res) => {
    // const { image } = req.body;
    // const image = 'girl1.jpg'
    // const pythonProcess = spawn('python', ['detect.py', '--image', image]);
    const pythonProcess = spawn('python', ['detect.py']);

    let dataToSend = "";
    pythonProcess.stdout.on('data', (data) => {
        dataToSend += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // pythonProcess.on('close', (code) => {
    //     console.log(`child process exited with code ${code}`);
    //     res.json({ result: dataToSend });
    // });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        
        // Assuming the Python script outputs lines like "Gender: Male" and "Age: 25-32 years"
        const outputLines = dataToSend.split('\n');
        let gender = '';
        let age = '';

        outputLines.forEach(line => {
            if (line.startsWith('Gender:')) {
                gender = line.split('Gender: ')[1].trim();
            } else if (line.startsWith('Age:')) {
                age = line.split('Age: ')[1].trim();
            }
        });

        res.json({ gender, age });
    });
});



app.use(errorHandler);

// Listen to the requests
app.listen(port, () => {
    // connect DB
    connectDB();
    console.log("Server started on port ", port);
})