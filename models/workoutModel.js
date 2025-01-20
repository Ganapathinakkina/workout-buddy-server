const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    }, 
    image_path: {
        type:String,
        required: true
    }

}, {timestamps: true})

const Workout = new mongoose.model("workout", workoutSchema);


module.exports = Workout;