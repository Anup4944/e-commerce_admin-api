import express, { Router } from 'express'
const router = express.Router();
import { storeRefreshJWT } from "../models/user/User.model.js";
import { verifyRefreshJwt } from "../helpers/jwt.helper.js";
import { getUserByEmailAndRefreshJWT } from "../models/user/User.model.js";

router.all("*" , (req,res , next) =>  {
    next()
})


// get refreshJWT and return new accessJWT
 router.get("/", async (req,res) => {
     try {
         const  {authorization} = req.headers;
         if(!authorization){
             return res.status(403).json({
                 status: "error",
                 message: "Unauthorized !"

             })
         }
 

    // call the function to get the accessJWT
    //  1. verify storeRefreshJWT
    const decodeJwt = await verifyRefreshJwt(authorization);
 
    if(decodeJwt.email){

         //  2. check if it is in the db

         const user = await getUserByEmailAndRefreshJWT({
             email:decodeJwt.email,
            refreshJwt: authorization})

        return res.json({
            status: "success",
            message: "Here is your new accessJWT",
            user,

        })
    }



   
    //  3. Find out the user who the code belongs to
    //  4. Create new JWT and store inthe session db
    //  5. Respond back to

    return res.statusCode(403).json({
        status: "error",
        message: "Unauthorized -"

    })

 
         
     } catch (error) {
        console.log(error)
        res.status(403).json({
        status: "error",
        message: "Unauthorized"

        })
    
     }
 });



 export default router;