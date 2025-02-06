const express = require("express");
const router = express.Router();
const authUser = require("../middleware/userMiddleware");

const {loginUser, signupUser, userInputs, updateUserWorkouts} = require("../controllers/userController") 


//Login user
router.post("/login", loginUser)


//Signup user
router.post("/signup", signupUser)


//UserInputs
router.post("/userinputs", authUser, userInputs)


router.put("/update-user-workouts",authUser, updateUserWorkouts )

module.exports = router;