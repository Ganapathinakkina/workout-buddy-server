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
    image_blob: {
        type:String,
        required: false,
    },
    workoutType:{
        type:String,
        required: false,
    },
    gender:{
        type:String,
        required: false,
    },

}, {timestamps: true})

const Workout = new mongoose.model("workout", workoutSchema);


module.exports = Workout;