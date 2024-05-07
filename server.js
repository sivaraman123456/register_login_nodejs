import express from "express"
const app=express()
import cors from "cors"
import swaggerui from "swagger-ui-express"
import jwtAuth from "./routes/jwtauth.js"
import {swagger_api} from './swagger.js'
import {config} from "dotenv";
import mg from "mailgun-js";
config();

//maligun
const mailgun=()=>mg({
    apiKey:process.env.MAILGUN_API,
    domain:process.env.MAILGUN_DOMAIN
})
//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//post api
app.post("/api/email",(req,res)=>{
    const {to,subject,msg}=req.body,
    emailInfo={
        from:'"Siva Raman"<sivaraman9344043151@gmail.com>',
        to:`${to}`,
        subject:`${subject}`,
        html:`${msg}`
    }
    // console.log(emailInfo);
    // res.send("testing....")
    mailgun().messages().send(emailInfo,(err,body)=>{
        if(err)
            {
                console.log(err);
                res.status(500).send({
                    message:"something went wrong in sending email  "
                })
            }
            else{
                res.send({message:"Email send successfully..."})
            }
    })
})


// swaggger
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Node JS API Project for postgres",
            version:"1.0.0"
        },
        servers:[
            {
              url: 'http://localhost:4000/auth'
            }
        ]
    },
    apis:['./server.js']
}
// const swaggerSpec=swaggerJSDoc(options)
app.use("/api-docs",swaggerui.serve,swaggerui.setup(swagger_api))

// register and login routes
/**
 * @swagger
 * /:
 * use:
 * summary:This api is use to register and login
 * description:This api is use to register and login
 * 200:
 * description:To test use Method
 *
 */
// import a  from "./routes/jwtauth"
// run server
// app.use("/",(req,res)=>{
//     res.send("welcome to my website")
// })
app.use("/auth",jwtAuth)
const PORT=4000
app.listen(PORT,(err)=>{
    if(err) console.error(err);
    else{
        console.log("server running on ",PORT);
    }
})