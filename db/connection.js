const mongoose = require("mongoose");
const {loadData} = require("./dbLoader");

mongoose.connect("mongodb://localhost:27017/backend-project")
 .then(()=>{
    console.log("connection is established");
    loadData();
})
.catch((err)=>{
    console.log(`Error is :${err}`)
})