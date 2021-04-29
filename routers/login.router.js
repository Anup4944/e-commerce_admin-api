import express, { Router } from 'express'
const router = express.Router()
import { comparePassword } from "../helpers/bcrypt.helper.js";
import {loginValidation } from "../middlewares/formValidation.js";
import { getUserByEmail } from "../models/user/User.model.js";
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

                 
        const dbHashPass = user.password;
        const result = await comparePassword(password, dbHashPass); 
        
        if(result){
            user.password = "";
     
        const accessJWT = await createAccessJWT(user.email, user._id);
        const refreshJWT = await createRefreshJWT(user.email, user._id);
        user.password = undefined; 
        user.refreshJWT = {};


        return res.json({
            status: "success",
            message: "The user has been authentication.",
            user,
            accessJWT,
            refreshJWT,

        });
        } 
        }
 

        res.json({
            status: "error",
            message: "Invalid login details",
            
        });
        
    } catch (error) {
        console.log(error);
        throw new Error(eror.message);
        
    }
});

export default router; 





