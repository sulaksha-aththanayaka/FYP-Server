import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
    imageUrl: {
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
    },
    brands: {
        type: [String],
        // enum: ['Male', 'Female'], // Restrict values to Male or Female
        required: true
    },
}, {
    timestamps: true
 }
);

export default mongoose.model("Image", imageSchema);