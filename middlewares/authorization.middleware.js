import { token } from "morgan";
import {verifyAccessJwt } from "../helpers/jwt.helper.js";
import { getAccessJwtByToken } from "../models/session/Session.model.js";

export const getUserSession =  (accessJWT) => {
    return new Promise(async(resolve, reject) =>{
        const sessionInfo = await getAccessJwtByToken(accessJWT)
        resolve(sessionInfo)


    })
}
export const userAuthorization = async (req, res, next) =>{
    try {
        const {authorization} = req.headers;
        const verifyToken =  verifyAccessJwt(authorization);
        console.log(">>>>>>",verifyToken);



        if(verifyToken?.email) {
            res.status(403).json({
                status: "error",
                message: "Unauthorized",
            });
           }

           const info  = await  getUserSession(authorization);
           console.log(tokenInfo);

           if(info.userId){
               req.body._ = userId;
               next();
           }

           
           
        
    } catch (error) {
        throw new Error(error.messsage)
        
    }
}

export default userAuthorization;

