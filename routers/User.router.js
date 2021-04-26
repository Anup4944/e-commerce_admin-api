import express, { Router } from 'express'
const router = express.Router()
import { hashPassword } from "../helpers/bcrypt.helper.js";
import {newUserValidation} from "../middlewares/formValidation.js";
import { userAuthorization } from "../middlewares/authorization.middleware.js";
import {  createUser } from "../models/user/User.model.js";
import {verifyAccessJwt}from "../helpers/jwt.helper.js"



router.all("*" , (req, res,next) =>{
    
    next();
})

router.get("/_id",userAuthorization,async(req,res) =>{
    
    
    try {
       
    const {_id } = req.params;
    if(!_id){
        return res.send({
            status: "error", 
            message: "Invalid request",
        });
    }


    const user = await getUserById(_id)
    if (user) user.password = undefined;

    user._id ? res.send({
        status: "success",
        message: "Welcome to your profile",
        user,
    }) 
    : res.send({
        status: "error",
        message: "Invalid request"

    });
        
    } catch (error) {
        res.send({
            status: "error",
            message: "invalid request",
    
        });
      
        
    }
} )

router.post("/", newUserValidation, async (req,res) =>{
    try {
   const {password} = req.body
   const hashPass = await hashPassword(password)
   console.log(hashPassword)

   const newUser = {
       ...req.body,
       password:hashPass,
   }
   const result = await createUser(newUser)
  
   if(result?._id){
       return res.json({status:"success" , message: "login success" , result})
   }
     res.json({status:"error" , message:"invalid login details"})
      
    } catch (error) {
       
        if(error.message.includes("duplicate key error collection")){
        return res.json({status : "error" , message: "This email already exist" })
     }
    throw new Error(error.message)
    
    }
});




export default router;
