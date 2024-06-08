import Video from "../models/video.js"

export const createVideo = async (req, res, next) => {
    // const {imgUrl, videoUrl} = req.body;
    const { videoUrl, gender, ageCategories } = req.body;

  

    if(!videoUrl || !gender || !ageCategories){
        res.status(400);
        // return next(new Error("imgUrl & videoUrl fields are required"));
        return next(new Error("videoUrl, gender and age categories fields are required"));
    }

    try {
        const video = await Video.create({
            videoUrl,
            gender,
            ageCategories
        });

        res.status(201).json({
            success: true,
            video,
        });
    } catch (error) {
        console.log(error);
        res.status(500);
        next(error);
    }
}