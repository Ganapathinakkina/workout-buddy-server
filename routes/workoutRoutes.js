const express = require("express");
const authUser = require("../middleware/userMiddleware")


const router = express.Router();


//Require Controllers

const {getWorkouts, getWorkout, createWorkout, editWorkout, deleteWorkout,} = require("../controllers/workoutController");


router.use(authUser)


//get entire records
router.get("/", getWorkouts);

//Get single record
router.get("/:id", getWorkout);

//create record
router.post("/", createWorkout);

//Update record
router.patch("/:id", editWorkout)

//Delete record
router.delete("/", deleteWorkout)






module.exports = router