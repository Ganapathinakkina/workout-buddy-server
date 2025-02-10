const User = require("../models/userModel");
const Workout = require("../models/workoutModel");

const createToken = require("../utils/token");
const mongoose = require("mongoose");


//Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password)
    //create token
    console.log("User Id : " + user._id);
    const token = createToken(user._id)
    res.status(200).json({ email, password, token })

  } catch (err) {
    res.status(400).json({ error: err.message })
  }

}


//Signup user
const signupUser = async (req, res) => {

  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    //create token
    const token = createToken(user._id)
    res.status(200).json({ email, password, token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }

  // res.json({msg: "user Signed up"})
}




// USERINPUTS
const userInputs = async (req, res) => {

  console.log(req.body);
  const { height, weight, gender, age, level} = req.body;
  const userId=req.user._id;
  console.log(userId);

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const existedUser = await User.findById(userId);

    if (!existedUser) {
      console.log("user not found with this ID : " + userId);
      return res.status(404).json("user not found with this ID : " + userId);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { height, weight, gender, age, level } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ error: "Failed to update userInputs" });
    }

    const collectedWorkoutData = await Workout.find();
    let filteredWorkouts = collectedWorkoutData.filter((workout) => {
      if (gender.toLowerCase() === "male") {
        return workout.gender === "Male";

      } else {
        return workout.gender === "Female";
      }
    });
    if (age >= 18 && age <= 25) {
      filteredWorkouts = filteredWorkouts.filter(
        (workout) =>
          workout.workoutType === "Very-Hard"
      );
    } else if (age > 25 && age <= 35) {
      filteredWorkouts = filteredWorkouts.filter(
        (workout) =>
          workout.workoutType === "Hard"
      );
    } else if (age > 35 && age <= 45) {
      filteredWorkouts = filteredWorkouts.filter(
        (workout) =>
          workout.workoutType === "Medium"
      );
    } else if (age > 45 && age <= 55) {
      filteredWorkouts = filteredWorkouts.filter(
        (workout) =>
          workout.workoutType === "Low"
      );
    } else {
      filteredWorkouts = filteredWorkouts.filter(
        (workout) =>
          workout.workoutType === "Very-low"
      );
    }

    updatedUser.password = null;

    res.status(200).json(filteredWorkouts);

  } catch (err) {
    res.status(400).json({ error: err.message })
  }

}


const updateUserWorkouts =  async (req, res)=>{

  const {workoutIds} = req.body;
  const userId=req.user._id;
  const existedUser = await User.findById(userId);


  const filteredWorkoutIds = await Promise.all(
    existedUser.workout_ids.map(async (id) => {
      const existedWorkout = await Workout.findById(id);
      return existedWorkout && existedWorkout.isCustomWorkout ? existedWorkout._id.toString() : null;
    })
  );
  const finalWorkoutIds = filteredWorkoutIds.filter(id => id !== null);
  existedUser.workout_ids=finalWorkoutIds;

  workoutIds.map((w, index)=>{
    existedUser.workout_ids.push(w);
  })

  await existedUser.save();
  return res.status(200).json({status:"succesfully added your workouts to the collections"})

}


module.exports = {
  loginUser,
  signupUser,
  userInputs,
  updateUserWorkouts,
}