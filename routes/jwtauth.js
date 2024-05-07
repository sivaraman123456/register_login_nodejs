import {config} from "dotenv";
import mg from "mailgun-js"
import {pool} from "../db.js"
import bcrypt from "bcrypt"
import {jwtGenerator} from "../utils/jwtgenerator.js" 
import {validation} from "../middlewares/validation.js"
// import authorization from "../middlewares/authorization.js"
import { Router } from "express";
import cors from "cors"

config();
//maligun
const mailgun=()=>mg({
    apiKey:process.env.MAILGUN_API,
    domain:process.env.MAILGUN_DOMAIN
})
const router = Router();


router.post("/register",validation,async(req,res)=>{
    try {
            //1.destructure user
const {name,email,password}=req.body,
emailInfo={
    from:'"Siva Raman"<sivaraman9344043151@gmail.com>',
    to:`${email}`,
    subject:`${name}`,
    html:"successfully register...!"
}

mailgun().messages().send(emailInfo,(err,body)=>{
    if(err)
        {
            console.log(err);
         return   res.status(500).json({
                message:"something went wrong in sending email  "
            })
        }
        else{
          return  res.json({message:"Email send successfully..."})
        }
})
    //2.check whether user exist or not
    const user=await pool.query("select * from register where email=$1",[email])
    if(user.rows.length !== 0)
    {
       return  res.json("user already exists..")
    }
//3.create bcrypt password
    const saltRound=10;
   const salt= await bcrypt.genSalt(saltRound)
   const bcryptpass= await bcrypt.hash(password,salt);
//    res.send(bcryptpass);
//4insert query
const newUser=await pool.query("insert into register (name,email,password)values($1,$2,$3) returning *",[name,email,bcryptpass])
//5.create Token
const token=jwtGenerator({user_id:newUser.rows[0].user_id});
res.json({token})
} catch (error) {
        console.error(error);
}
})
router.post("/login",validation,async(req,res)=>{
    try {
//1. destructure        
const {email,password}=req.body,
emailInfo={
    from:'"Siva Raman"<sivaraman9344043151@gmail.com>',
    to:`${email}`,
    subject:"Login ",
    html:"successfully Login...!"
}
console.log("login");
mailgun().messages().send(emailInfo,(err,body)=>{
    if(err)
        {
            console.log(err);
          return  res.status(500).json({
                message:"something went wrong in sending email  "
            })
        }
        else{
           return  res.json({message:"Email send successfully..."})
        }
})
//2. chech if the user already exist or not
const user=await pool.query("select * from  register where email=$1",[email])
if (user.rows.length === 0)
{
    return res.json("password or email invalid")
}
//3.check the coming password and DB password same or not
const validpass=bcrypt.compare(password,user.rows[0].password)
if (!validpass)
{
    return res.json("password in valid")
}
//4.give them jwt Token
const Token=jwtGenerator({user_id:user.rows[0].user_id})
res.json({Token})
} catch (error) {
        console.error(error);
    }
})

router.get("/verify",(req,res)=>{
    try {
        res.json(true)
    } catch (error) {
        console.error(error);
    }
})
export default router;