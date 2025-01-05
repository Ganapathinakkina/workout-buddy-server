const express = require("express");
const router = express.Router();

const {loginUser, signupUser, userInputs} = require("../controllers/userController") 


//Login user
router.post("/login", loginUser)


//Signup user
router.post("/signup", signupUser)


//UserInputs
router.post("/userinputs", userInputs)


module.exports = router;