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
    const { title, reps, load } = req.body;
    
    try {
        const user_id = req.user._id
        const newWorkout = new Workout({ title, reps, load, user_id });
        console.log(JSON.stringify(newWorkout, null, 2));

        const workout = await newWorkout.save();
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