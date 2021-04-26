import jwt from "jsonwebtoken";
import { storeAccessJwt } from "../models/session/Session.model.js";
import { storeRefreshJWT } from "../models/user/User.model.js";

export const createAccessJWT =  (email,_id) => {

    return new Promise (async(resolve, reject) =>{
        try {
            const accessJWT = await jwt.sign( { email }, process.env.JWT_ACCESS_SECRET,{expiresIn : '15m'});
            

            if(accessJWT){
            const newSession = {accessJWT, userId: _id }
            storeAccessJwt(_id, refreshJWT)
            }
            resolve(accessJWT);
            
        } catch (error) {
            reject(error);
            
        }
    })
  
}

export const createRefreshJWT = (email , _id) =>{
    return new Promise( async (resolve, reject) => {
        try {
            const refreshJWT = await jwt.sign({email}, process.env.JWT_REFRESH_SECRET, {expiresIn:"30d"})
            storeRefreshJWT()
            resolve(refreshJWT)

            
        } catch (error) {
            reject(error);
            
        }
    })
}

export const verifyAccessJwt = accessJWT => {
    try {
    const  decoded = jwt.verify(access.JWI, process.env.JWT_ACCESS_SECRET);
   
    return Promise.resolve(decoded);
        
    } catch (error) {
    return Promise.reject(false)
        
    }
}

export const verifyRefreshJwt = refreshJWT => {
    try {
    const  decoded = jwt.verify(access.JWI, process.env.JWT_REFRESH_SECRET);
   
    return Promise.resolve(decoded);
        
    } catch (error) {
    return Promise.reject(error)
        
    }
}

