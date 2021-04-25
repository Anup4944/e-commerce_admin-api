import express, { Router } from 'express'
const router = express.Router()
import { hashPassword,comparePassword } from "../helpers/bcrypt.helper.js";
import {loginValidation, newUserValidation} from "../middlewares/formValidation.js";
import { getUserByEmail, createUser, storeRefreshJWT } from "../models/user/User.modules.js";
import {createAccessJWT,createRefreshJWT} from "../helpers/jwt.helper.js";



router.all("*" , (req, res,next) =>{
    
    next();
})


 
router.post("/", loginValidation, async (req,res) =>{
    try {
   const {email ,password} = req.body

   const user = await getUserByEmail(email)

   console.log(user);
   if(user?._id){
       return res
       .status(404)
       .json({status:"error" , message: "invalid login details"})
   }

   const dbHashPass = user.password;
   const result = await comparePassword(password, dbHashPass);
   console.log(result)

  

   if(!result){
       return res.json({status:"error" , message:"invalid login details"})
   }

   user.password = "";

   const accessJWT = await createAccessJWT(user.email, user._id);
   const refreshJWT = await createRefreshJWT(user.email, user._id);
   user.password = undefined; 
   user.refreshJWT = undefined;
   

   result 
   ? res.json({
       status: "success",
       message: "login success",
       user,
   })

    : res.json({status:"error" , message:"invalid login details"})
    
    
        
    } catch (error) {
        console.log(error);
        throw new Error(eror.message);
        
    }
});



router.put("/", newUserValidation, async (req,res) =>{
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


// router.post();
export default router;
