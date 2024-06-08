import express from "express"
import { fetchVideos } from "../controllers/fetch-videos.js"

const router = express.Router();

// http://localhost:5000/api/fetch-videos
router.get("/", fetchVideos);

export default router;