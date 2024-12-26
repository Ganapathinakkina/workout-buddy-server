const express = require("express");
const router = express.Router();

const {loginUser, signupUser} = require("../controllers/userController") 


//Login user
router.post("/login", loginUser)



//Signup user
router.post("/signup", signupUser)


module.exports = router;