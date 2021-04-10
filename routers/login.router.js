import express, { Router } from 'express'
const router = express.Router()
import {loginValidation} from "../middlewares/formValidation.js";
import { getUserEmailByPassword, createUser } from "../models/user/User.modules.js";



router.all("*" , (req, res,next) =>{
    
    next();
})


 
router.post("/", loginValidation, async (req,res) =>{
    try {
   const result = await getUserEmailByPassword(req.body)
   console.log(result);
   if(result?._id){
       return res.json({status:"success" , message: "login success" , result})
   }
     res.json({status:"error" , message:"invalid login details", result})
    
    
        
    } catch (error) {
        console.log(error);
        throw new error(eror.message);
        
    }
});

// router.post();
export default router;
