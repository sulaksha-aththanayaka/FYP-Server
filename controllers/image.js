import Video from "../models/video.js"

export const createImage = async (req, res, next) => {
    // const {imgUrl, videoUrl} = req.body;
    const { videoUrl, mediaType, gender, ageCategories, brands } = req.body;


    if(!videoUrl || !mediaType ||!gender || !ageCategories || !brands){
        res.status(400);
        // return next(new Error("imgUrl & videoUrl fields are required"));
        return next(new Error("imageUrl, gender and age categories fields are required"));
    }

    try {
        const image = await Video.create({
            videoUrl,
            mediaType,
            gender,
            ageCategories,
            brands
        });

        res.status(201).json({
            success: true,
            image,
        });
    } catch (error) {
        console.log(error);
        res.status(500);
        next(error);
    }
}