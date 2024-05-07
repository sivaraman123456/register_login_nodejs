import jwt from "jsonwebtoken"
import {config} from 'dotenv';

config();

export  function jwtGenerator(user_id){
const payload={user:user_id}
return jwt.sign(payload,process.env.jwt_secret,{expiresIn:"1hr"})
}
