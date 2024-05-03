const express=require("express")
const app=express()
const cors=require("cors")
const swaggerjsdoc=require("swagger-jsdoc")
const swaggerui=require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")
//middleware
app.use(cors())
app.use(express.json())
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
              url: 'http://localhost:4000/'
            }
        ]
    },
    apis:['./server.js']
}
const swaggerSpec=swaggerJSDoc(options)
app.use("/api-docs",swaggerui.serve,swaggerui.setup(swaggerSpec))

// register and login routes

app.use("/auth",require("./routes/jwtauth"))
// run server
const PORT=4000
app.listen(PORT,(err)=>{
    if(err) console.error(err);
    else{
        console.log("server running on ",PORT);
    }
})