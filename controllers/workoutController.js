const User = require("../models/userModel");
const Workout = require("../models/workoutModel")

//Get all Data

const getWorkouts = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    
    
    // console.log("it here, we got it :"+req.user._id);

    const user_id = req.user._id;

    try {
        const workoutData = await Workout.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(workoutData)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//Get Single Data

const getWorkout = async (req, res) => {
    try {
        const id = req.params.id
        const workoutData = await Workout.findById({ _id: id })
        res.status(200).json(workoutData)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

//Create Data

const createWorkout = async (req, res) => {
    const { title, reps, load, image_path } = req.body;
    
    try {
        const user_id = req.user._id

        const existedUser= await User.findById(user_id);

        if(!existedUser)
        {
            res.status(404).json({ error: "User not found with this Id" });
        }

        const newWorkout = new Workout({ title, reps, load, image_path });
        console.log(JSON.stringify(newWorkout, null, 2));

        const workout = await newWorkout.save();

        if (!existedUser.workout_ids.includes(workout._id)) 
        { 
            existedUser.workout_ids.push(workout._id); 
            await existedUser.save(); 
            console.log("Saved workout ID:", workout._id);
        } else {
            console.log("Workout ID already exists in user's workout_ids array.");
        }


        res.status(201).json(workout);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}


//Update Data
const editWorkout = async (req, res) => {
    try {
        const id = req.params.id
        const workoutData = await Workout.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(workoutData)

    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}


//Delete Data
const deleteWorkout = async (req, res) => {
    try {
        const id = req.params.id
        const workoutData = await Workout.findByIdAndDelete({ _id: id })
        res.status(200).json(workoutData)

    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    editWorkout,
    deleteWorkout
}