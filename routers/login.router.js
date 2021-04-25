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
        // create  access JWT and refreshJWT
     
        user.password = "";
     
        const accessJWT = await createAccessJWT(user.email, user._id);
        const refreshJWT = await createRefreshJWT(user.email, user._id);
        user.password = undefined; 
        user.refreshJWT = undefined;

        res.json({
            status: "success",
            message: "login success",
            user,
            accessJWT,
            refreshJWT,
        });
        
    } catch (error) {
        console.log(error);
        throw new Error(eror.message);
        
    }
});

export default router; 





