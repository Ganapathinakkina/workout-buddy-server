const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


const authUser = async(req, res, next)=>{
    const {authorization} = req.headers;

    console.log("Auth token : "+JSON.stringify(authorization,null,2));

    if(!authorization){
        return res.status(401).json({error: "Auth token required"})
    }

    const token = authorization.split(" ")[1];
    try{
        const {_id} = jwt.verify(token, process.env.JWT_SECRET)
        console.log("User ID from the JWT toke varification :"+JSON.stringify(_id));
        req.user = await User.findOne({_id}).select("_id");
        console.log( "The user : "+JSON.stringify(req.user, null, 2)); 
        next();

    }catch(error){
        res.status(401).json({ error: "Request is not authorised" })
    }
}



module.exports = authUser
