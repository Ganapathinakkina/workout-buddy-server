const jwt = require("jsonwebtoken");

const createToken = (_id)=>{
  return  jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: "60m"})
  // return  jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: "1m"})
}

module.exports = createToken