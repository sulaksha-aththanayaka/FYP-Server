import mongoose from "mongoose"

// const videoSchema = new mongoose.Schema({
//     imgUrl: {
//         type: String,
//         required: true
//     },
//     videoUrl: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true
//  }
// );

const videoSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        // enum: ['Male', 'Female'], // Restrict values to Male or Female
        required: true
    },
    ageCategories: {
        type: [String], // Array of strings for multiple age categories
        required: true
    }
}, {
    timestamps: true
 }
);

export default mongoose.model("Video", videoSchema);