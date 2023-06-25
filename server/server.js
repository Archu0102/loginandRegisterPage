const express= require('express');
require('dotenv').config()   //ise v top me use krle kyuki process.env se access kr ske
const Port= process.env.PORT || 5000;
const mongoose=require('mongoose')
const app=express()
const userRoute=require('./route/userRoute')
const cors = require('cors')

// app.get("/",(req,res)=>{
//     res.send("i am runnning ok");
// })


///middleware
app.use(cors())  //NOTE ----ise route se pehle lgao
app.use(express.json()); // to parse the request body
app.use("/api/user",userRoute)

//database connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("server is connected with database")})
.catch(()=>{console.log("error with database connection")})
//listen server
app.listen(Port,()=>{
    console.log(`server is running on port :${Port}`)
})