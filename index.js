require("dotenv").config()

const express = require("express");
const cors = require("cors");

const app = express();

//PORT

const port = process.env.PORT || 5000

//DB connection
require("./db/connection")


//Reqire Routes
const workoutRoutes = require("./routes/workoutRoutes")
const userRoutes = require("./routes/userRoutes")


//MiddleWares
app.use(express.json())

app.use(cors())

// app.get("/", (req, res)=>{
//     res.send("hello")
// })


//Routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

app.listen(port, ()=>{
    console.log(`Server is running at PORT ${port}`)
})