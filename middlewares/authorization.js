import jwt from "jsonwebtoken"
require("dotenv").config()

module.exports=async(req,res,next)=>{
try {
    const jwtToken=req.header("token")
    console.log(jwtToken);
    if(!jwtToken)
    {
        return res.json("Invalid authorization")
    }
    const payload=jwt.verify(jwtToken,process.env.jwt_secret)
    req.user=payload.user
    console.log(req.user);
next();
} catch (error) {
    console.error(error);
}

}