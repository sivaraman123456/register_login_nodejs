const router=require("express").Router()
const pool=require("../db")
const bcrypt=require("bcrypt")
const jwtGenerator=require("../utils/jwtgenerator")
const validation=require("../middlewares/validation")
const authorization = require("../middlewares/authorization")
/**
 * @swagger
 * /:
 * get:
 * summary:This api is use to register and login
 * description:This api is use to register and login
 * 200:
 * description:To test get Method
 *
 */

router.post("/register",validation,async(req,res)=>{
    try {
            //1.destructure user
const {name,email,password}=req.body;
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
const {email,password}=req.body;
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

router.get("/verify",authorization,(req,res)=>{
    try {
        res.json(true)
    } catch (error) {
        console.error(error);
    }
})

module.exports=router;