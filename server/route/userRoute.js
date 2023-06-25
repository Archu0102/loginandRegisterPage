const express =require('express')
const  {userRegister,userLogin,getUsers}=require('../controller/userController')
const router=express.Router();
router.post('/signup',userRegister)
router.post('/signin',userLogin)
router.get('/getusers',getUsers)


// routes and controller together here
//  router.post("/",(req,res)=>{
//     console.log("ravi")
// })
module.exports=router