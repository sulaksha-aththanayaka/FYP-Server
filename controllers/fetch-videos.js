// controllers/videoController.js
import Video from '../models/video.js';

export const fetchVideos = async (req, res, next) => {
    // const { gender } = req.body;
    const { gender, age, brand } = req.query;
    // const brand = req.query.brand.trim();


    if (!gender || !age || !brand) {
        return res.status(400).json({ message: 'Gender and age are required' });
    }

    try {
        // const results = await Video.find({ gender: { $regex: gender, $options: 'i' } });
        const results = await Video.find({ gender: gender, ageCategories: { $in: age } });
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
