import jwt from "jsonwebtoken";
import { storeAccessJwt } from "../models/session/Session.model.js";

export const createAccessJWT =  email => {

    return new Promise (async(resolve, reject) =>{
        try {
            const accessJWT = await jwt.sign( { email }, process.env.JWT_SECRET_KEY,{expiresIn : '15m'});
            resolve(accessJWT);

            if(accessJWT){
             const newSession = {accessJWT, userId : _id }
             await storeAccessJwt(newSession)
            }
            
        } catch (error) {
            reject(error);
            
        }
    })
  
}

export const createRefreshJWT = (email , _id) =>{
    return new Promise( async (resolve, reject) => {
        try {
            const refreshJWT = await jwt.sign({email}, process.env.JWT_REFRESH_SECRET, {expiresIn:"30d"})
            resolve(refreshJWT)

            
        } catch (error) {
            reject(error);
            
        }
    })
}

/// store in db 

